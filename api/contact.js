import { pbkdf2, verifySolution } from 'altcha/dist/lib/index.js';

function setCommonHeaders(res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function buildEmailSubject(eventType) {
  return `Event Inquiry - ${eventType}`;
}

function buildEmailBody(name, email, phone, eventType, message) {
  return `Hello DAS EVENTS,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nEvent Type: ${eventType}\n\nMessage:\n${message}\n`;
}

function parsePayload(base64Payload) {
  const decoded = Buffer.from(base64Payload, 'base64').toString('utf-8');
  return JSON.parse(decoded);
}

function sanitize(input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendViaBrevoApi(brevo, subject, body, replyToEmail, replyToName) {
  const apiKey = brevo.apiKey || '';
  const fromEmail = brevo.fromEmail || '';
  const fromName = brevo.fromName || 'DAS EVENTS';
  const toEmail = brevo.toEmail || '';

  if (!apiKey || !fromEmail || !toEmail) {
    return false;
  }

  const payload = {
    sender: {
      name: fromName,
      email: fromEmail,
    },
    to: [{ email: toEmail }],
    replyTo: {
      name: replyToName,
      email: replyToEmail,
    },
    subject,
    textContent: body,
  };

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(payload),
  });

  return response.ok;
}

export default async function handler(req, res) {
  setCommonHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const input = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  if (!input || typeof input !== 'object') {
    res.status(400).json({ success: false, error: 'Invalid request body' });
    return;
  }

  const altchaPayload = input.altcha;
  if (!altchaPayload) {
    res.status(400).json({ success: false, error: 'Missing CAPTCHA verification' });
    return;
  }

  const secret = process.env.ALTCHA_SECRET || 'CHANGE_ME_TO_A_RANDOM_SECRET_KEY';

  try {
    const payload = parsePayload(altchaPayload);

    const verifyResult = await verifySolution({
      challenge: payload.challenge,
      solution: payload.solution,
      deriveKey: pbkdf2,
      hmacSignatureSecret: secret,
    });

    if (!verifyResult.verified) {
      res.status(400).json({ success: false, error: 'CAPTCHA verification failed' });
      return;
    }
  } catch (error) {
    res.status(400).json({ success: false, error: 'Invalid CAPTCHA verification payload' });
    return;
  }

  const name = String(input.name || '').trim();
  const email = String(input.email || '').trim();
  const phone = String(input.phone || '').trim();
  const eventType = String(input.eventType || '').trim();
  const message = String(input.message || '').trim();

  if (!name || !email || !phone || !eventType || !message) {
    res.status(400).json({ success: false, error: 'All fields are required' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ success: false, error: 'Invalid email address' });
    return;
  }

  const safeName = sanitize(name);
  const safeEmail = sanitize(email);
  const safePhone = sanitize(phone);
  const safeEventType = sanitize(eventType);
  const safeMessage = sanitize(message);

  const subject = buildEmailSubject(safeEventType);
  const body = buildEmailBody(safeName, safeEmail, safePhone, safeEventType, safeMessage);

  const brevo = {
    apiKey: process.env.BREVO_API_KEY || '',
    fromEmail: process.env.BREVO_FROM_EMAIL || 'noreply@dasevent.in.com',
    fromName: process.env.BREVO_FROM_NAME || 'DAS EVENTS',
    toEmail: process.env.BREVO_TO_EMAIL || 'info@dasevent.in.com',
  };

  try {
    const sent = await sendViaBrevoApi(brevo, subject, body, safeEmail, safeName);
    if (!sent) {
      res.status(500).json({ success: false, error: 'Failed to send email. Please try again later.' });
      return;
    }

    res.status(200).json({ success: true, message: 'Thank you! Your message has been sent.' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to send email. Please try again later.' });
  }
}
