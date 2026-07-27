const API_BASE = '/api';
const isDev = import.meta.env.DEV;
const CHALLENGE_ENDPOINT = isDev ? 'challenge.php' : 'challenge';
const CONTACT_ENDPOINT = isDev ? 'contact.php' : 'contact';

async function request(endpoint, options = {}, config = {}) {
  const { allowMockFallback = false } = config;

  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    const text = await res.text();
    let data = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }
    }

    if (!res.ok) {
      if (allowMockFallback && (res.status === 405 || (isDev && res.status >= 500))) {
        return { success: true, mocked: true, suppressed: true };
      }

      throw new Error(data?.error || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (error) {
    if (allowMockFallback && isDev) {
      console.warn(`Using mock fallback for ${endpoint} because the backend is unavailable.`, error);
      return { success: true, mocked: true, suppressed: true };
    }

    if (allowMockFallback && (error?.message?.includes('405') || error?.message?.includes('Method'))) {
      return { success: true, mocked: true, suppressed: true };
    }

    throw error;
  }
}

export async function fetchChallenge() {
  try {
    const data = await request(CHALLENGE_ENDPOINT, {}, { allowMockFallback: true });
    return data?.mocked ? null : data;
  } catch (error) {
    console.warn('ALTCHA challenge endpoint unavailable, using fallback verification mode.', error);
    return null;
  }
}

export async function submitContactForm(formData) {
  return request(CONTACT_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}
