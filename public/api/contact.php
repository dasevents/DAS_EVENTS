<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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
use AltchaOrg\Altcha\Payload;
use AltchaOrg\Altcha\VerifySolutionOptions;
use AltchaOrg\Altcha\Algorithm\Pbkdf2;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
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
$payload = Payload::fromBase64($altchaPayload);
$pbkdf2 = new Pbkdf2();

$result = $altcha->verifySolution(new VerifySolutionOptions(
    algorithm: $pbkdf2,
    payload: $payload,
));

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

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $smtp['host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtp['username'];
    $mail->Password   = $smtp['password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $smtp['port'];
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($smtp['from_email'], $smtp['from_name']);
    $mail->addAddress($smtp['to_email']);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(false);

    $mail->Subject = "Event Inquiry - {$eventType}";
    $mail->Body    = "Hello DAS EVENTS,\n\n" .
        "Name: {$name}\n" .
        "Email: {$email}\n" .
        "Phone: {$phone}\n" .
        "Event Type: {$eventType}\n\n" .
        "Message:\n{$message}\n";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again later.']);
}
