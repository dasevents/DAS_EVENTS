<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

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

echo json_encode([
    'algorithm' => $challenge->algorithm,
    'challenge' => $challenge->challenge,
    'salt' => $challenge->salt,
    'challengekey' => $challenge->challengekey,
    'signature' => $challenge->signature,
]);
