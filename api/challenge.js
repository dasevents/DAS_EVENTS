import { createChallenge, pbkdf2 } from 'altcha/dist/lib/index.js';

function setCommonHeaders(res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  setCommonHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secret = process.env.ALTCHA_SECRET || 'CHANGE_ME_TO_A_RANDOM_SECRET_KEY';

  try {
    const challenge = await createChallenge({
      algorithm: 'PBKDF2/SHA-256',
      deriveKey: pbkdf2,
      cost: 5000,
      counter: Math.floor(Math.random() * 5001) + 5000,
      expiresAt: Math.floor(Date.now() / 1000) + 600,
      hmacSignatureSecret: secret,
    });

    res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create challenge' });
  }
}
