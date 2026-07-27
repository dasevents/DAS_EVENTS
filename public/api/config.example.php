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

// Email Provider: 'smtp' (default) or 'brevo'
$email_provider = getenv('EMAIL_PROVIDER') ?: 'smtp';

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

// Brevo Transactional Email API Configuration
// Create API key in Brevo: SMTP & API -> API Keys
$brevo = [
    // Brevo v3 API key
    'api_key'    => getenv('BREVO_API_KEY') ?: '',

    // From address verified in Brevo
    'from_email' => getenv('BREVO_FROM_EMAIL') ?: 'noreply@dasevent.in.com',

    // From display name
    'from_name'  => getenv('BREVO_FROM_NAME') ?: 'DAS EVENTS',

    // Recipient email (where form submissions go)
    'to_email'   => getenv('BREVO_TO_EMAIL') ?: 'info@dasevent.in.com',
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
| Brevo API (Free tier available):
|   EMAIL_PROVIDER=brevo
|   BREVO_API_KEY=your_brevo_api_key
|   BREVO_FROM_EMAIL=verified-sender@yourdomain.com
|   BREVO_FROM_NAME=DAS EVENTS
|   BREVO_TO_EMAIL=info@yourdomain.com
|
*/
