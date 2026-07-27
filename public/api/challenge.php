<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

use AltchaOrg\Altcha\Altcha;
use AltchaOrg\Altcha\CreateChallengeOptions;
use AltchaOrg\Altcha\Algorithm\Pbkdf2;

$altcha = new Altcha(hmacSignatureSecret: $secret);
$pbkdf2 = new Pbkdf2();

$challenge = $altcha->createChallenge(new CreateChallengeOptions(
    algorithm: $pbkdf2,
    cost: 5000,
    counter: random_int(5000, 10000),
    expiresAt: time() + 600,
));

echo $challenge->toJson();
