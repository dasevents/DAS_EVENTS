import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
    validateField,
    reset: resetValidation,
  } = useFormValidation(INITIAL_FORM_DATA);

  const loadChallenge = useCallback(async () => {
    try {
      const data = await fetchChallenge();

      if (widgetRef.current) {
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          widgetRef.current.configure({
            challenge: data,
            test: false,
            hideFooter: true,
          });
        } else {
          widgetRef.current.configure({
            challenge: null,
            test: true,
            hideFooter: true,
          });
          setAltchaVerified(false);
          setAltchaPayload(null);
        }
      }
    } catch (err) {
      console.error('Failed to configure ALTCHA widget:', err);
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

  const canSubmit = useMemo(() => {
    const requiredFields = ['name', 'email', 'phone', 'eventType', 'message'];

    const hasValidationErrors = requiredFields.some((field) => {
      const value = formData[field];
      return Boolean(validateField(field, value));
    });

    return !hasValidationErrors && Boolean(altchaVerified && altchaPayload);
  }, [altchaPayload, altchaVerified, formData, validateField]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);

    const hasErrors = validateAll();
    if (hasErrors) {
      setError('Please complete all required fields correctly.');
      return;
    }

    if (!altchaVerified || !altchaPayload) {
      setError('Please complete the CAPTCHA verification');
      return;
    }

    setSubmitting(true);

    try {
      await submitContactForm({ ...formData, altcha: altchaPayload });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(false);
      setError('We could not send your message right now. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  }, [formData, altchaPayload, altchaVerified, validateAll]);

  return {
    formData,
    errors,
    touched,
    submitted,
    submitting,
    error,
    altchaVerified,
    altchaPayload,
    canSubmit,
    widgetRef,
    handleChange,
    handleSelectChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
