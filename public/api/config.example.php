<?php
// Copy this file to config.php and configure your settings
// config.php is gitignored and won't be committed

// ALTCHA Secret
// Option 1: Set via .htaccess: SetEnv ALTCHA_SECRET your_secret_here
// Option 2: Hardcode below
$secret = getenv('ALTCHA_SECRET');
if (!$secret) {
    $secret = 'CHANGE_ME_TO_A_RANDOM_SECRET_KEY';
}

// SMTP Configuration
// Get these from your email provider (GoDaddy/Hostinger/Gmail/etc.)
$smtp = [
    // SMTP server address
    'host'       => getenv('SMTP_HOST') ?: 'smtp.example.com',

    // Port: 587 (TLS) or 465 (SSL)
    'port'       => getenv('SMTP_PORT') ?: 587,

    // Your email address
    'username'   => getenv('SMTP_USERNAME') ?: 'your@email.com',

    // Your email password or app password
    'password'   => getenv('SMTP_PASSWORD') ?: 'your_password',

    // Encryption: 'tls' or 'ssl'
    'encryption' => getenv('SMTP_ENCRYPTION') ?: 'tls',

    // From address (appears as sender)
    'from_email' => getenv('SMTP_FROM_EMAIL') ?: 'noreply@dasevent.in.com',

    // From name
    'from_name'  => getenv('SMTP_FROM_NAME') ?: 'DAS EVENTS',

    // Recipient email (where form submissions go)
    'to_email'   => getenv('SMTP_TO_EMAIL') ?: 'info@dasevent.in.com',
];

/*
|--------------------------------------------------------------------------
| SMTP Provider Examples
|--------------------------------------------------------------------------
|
| GoDaddy:
|   'host' => 'smtpout.secureserver.net',
|   'port' => 465,
|   'encryption' => 'ssl',
|
| Hostinger:
|   'host' => 'smtp.hostinger.com',
|   'port' => 465,
|   'encryption' => 'ssl',
|
| Gmail:
|   'host' => 'smtp.gmail.com',
|   'port' => 587,
|   'encryption' => 'tls',
|   'username' => 'you@gmail.com',
|   'password' => 'your_app_password',
|
| Outlook/365:
|   'host' => 'smtp.office365.com',
|   'port' => 587,
|   'encryption' => 'tls',
|
*/
