import { useState, useEffect, useRef, useCallback } from 'react';
import { useFormValidation } from './useFormValidation';
import { fetchChallenge, submitContactForm } from '../api/contact';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  eventType: '',
  message: '',
};

export function useContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [altchaPayload, setAltchaPayload] = useState(null);
  const [altchaVerified, setAltchaVerified] = useState(false);
  const widgetRef = useRef(null);

  const {
    values: formData,
    errors,
    touched,
    handleChange,
    handleSelectChange,
    handleBlur,
    validateAll,
    reset: resetValidation,
  } = useFormValidation(INITIAL_FORM_DATA);

  const loadChallenge = useCallback(async () => {
    try {
      const data = await fetchChallenge();
      if (widgetRef.current) {
        widgetRef.current.configure({ challenge: JSON.stringify(data) });
      }
    } catch (err) {
      console.error('Failed to fetch ALTCHA challenge:', err);
    }
  }, []);

  useEffect(() => {
    loadChallenge();
  }, [loadChallenge]);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    const handleVerified = (e) => {
      setAltchaPayload(e.detail.payload);
      setAltchaVerified(true);
    };

    const handleStateChange = (e) => {
      if (e.detail.state === 'unverified' || e.detail.state === 'expired') {
        setAltchaVerified(false);
        setAltchaPayload(null);
      }
    };

    widget.addEventListener('verified', handleVerified);
    widget.addEventListener('statechange', handleStateChange);

    return () => {
      widget.removeEventListener('verified', handleVerified);
      widget.removeEventListener('statechange', handleStateChange);
    };
  }, []);

  const resetForm = useCallback(() => {
    resetValidation(INITIAL_FORM_DATA);
    setSubmitted(false);
    setAltchaVerified(false);
    setAltchaPayload(null);
    loadChallenge();
  }, [loadChallenge, resetValidation]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);

    const hasErrors = validateAll();
    if (hasErrors) return;

    if (!altchaVerified || !altchaPayload) {
      setError('Please complete the CAPTCHA verification');
      return;
    }

    setSubmitting(true);

    try {
      await submitContactForm({ ...formData, altcha: altchaPayload });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      loadChallenge();
    } finally {
      setSubmitting(false);
    }
  }, [formData, altchaPayload, altchaVerified, loadChallenge, validateAll]);

  return {
    formData,
    errors,
    touched,
    submitted,
    submitting,
    error,
    altchaVerified,
    widgetRef,
    handleChange,
    handleSelectChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
