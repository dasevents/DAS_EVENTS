const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}

export async function fetchChallenge() {
  return request('challenge.php');
}

export async function submitContactForm(formData) {
  return request('contact.php', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}
