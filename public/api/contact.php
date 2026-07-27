<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

use AltchaOrg\Altcha\Altcha;
use AltchaOrg\Altcha\VerifySolutionOptions;
use AltchaOrg\Altcha\Algorithm\Pbkdf2;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request body']);
    exit;
}

$altchaPayload = $input['altcha'] ?? null;
if (!$altchaPayload) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing CAPTCHA verification']);
    exit;
}

$altcha = new Altcha(hmacSignatureSecret: $secret);
$pbkdf2 = new Pbkdf2();

try {
    $result = $altcha->verifySolution(new VerifySolutionOptions(
        algorithm: $pbkdf2,
        payload: $altchaPayload,
    ));
} catch (\InvalidArgumentException $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid CAPTCHA verification payload']);
    exit;
}

if (!$result->verified) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'CAPTCHA verification failed']);
    exit;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$eventType = trim($input['eventType'] ?? '');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($phone) || empty($eventType) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$eventType = htmlspecialchars($eventType, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

function buildEmailSubject(string $eventType): string
{
    return "Event Inquiry - {$eventType}";
}

function buildEmailBody(string $name, string $email, string $phone, string $eventType, string $message): string
{
    return "Hello DAS EVENTS,\n\n" .
        "Name: {$name}\n" .
        "Email: {$email}\n" .
        "Phone: {$phone}\n" .
        "Event Type: {$eventType}\n\n" .
        "Message:\n{$message}\n";
}

function sendViaBrevoApi(array $brevo, string $subject, string $body, string $replyToEmail, string $replyToName): bool
{
    $apiKey = $brevo['api_key'] ?? '';
    $fromEmail = $brevo['from_email'] ?? '';
    $fromName = $brevo['from_name'] ?? 'DAS EVENTS';
    $toEmail = $brevo['to_email'] ?? '';

    if (empty($apiKey) || empty($fromEmail) || empty($toEmail)) {
        return false;
    }

    $payload = [
        'sender' => [
            'name' => $fromName,
            'email' => $fromEmail,
        ],
        'to' => [
            ['email' => $toEmail],
        ],
        'replyTo' => [
            'name' => $replyToName,
            'email' => $replyToEmail,
        ],
        'subject' => $subject,
        'textContent' => $body,
    ];

    $ch = curl_init('https://api.brevo.com/v3/smtp/email');
    if ($ch === false) {
        return false;
    }

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'accept: application/json',
            'content-type: application/json',
            'api-key: ' . $apiKey,
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 15,
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErrNo = curl_errno($ch);
    curl_close($ch);

    return $response !== false && $curlErrNo === 0 && $httpCode >= 200 && $httpCode < 300;
}

function sendViaSmtp(array $smtp, string $subject, string $body, string $replyToEmail, string $replyToName): bool
{
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $smtp['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtp['username'];
        $mail->Password   = $smtp['password'];

        $encryption = strtolower((string) ($smtp['encryption'] ?? 'tls'));
        $mail->SMTPSecure = $encryption === 'ssl'
            ? PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer::ENCRYPTION_STARTTLS;

        $mail->Port       = (int) $smtp['port'];
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom($smtp['from_email'], $smtp['from_name']);
        $mail->addAddress($smtp['to_email']);
        $mail->addReplyTo($replyToEmail, $replyToName);

        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body = $body;

        return $mail->send();
    } catch (Exception $e) {
        return false;
    }
}

$subject = buildEmailSubject($eventType);
$body = buildEmailBody($name, $email, $phone, $eventType, $message);

$provider = strtolower((string) ($email_provider ?? 'smtp'));

$sent = false;

if ($provider === 'brevo') {
    $sent = sendViaBrevoApi($brevo ?? [], $subject, $body, $email, $name);
    if (!$sent) {
        $sent = sendViaSmtp($smtp, $subject, $body, $email, $name);
    }
} else {
    $sent = sendViaSmtp($smtp, $subject, $body, $email, $name);
}

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again later.']);
}
