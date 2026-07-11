import { useState, useCallback } from 'react';
import { sanitize, sanitizeName, sanitizeEmail, sanitizePhone, sanitizeMessage } from './useSanitize';

const validators = {
  name: (value) => {
    const clean = sanitizeName(value);
    if (!clean) return 'Name is required';
    if (clean.length < 2) return 'Name must be at least 2 characters';
    if (clean.length > 100) return 'Name must be less than 100 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(clean)) return 'Name contains invalid characters';
    return null;
  },
  email: (value) => {
    const clean = sanitizeEmail(value);
    if (!clean) return 'Email is required';
    if (clean.length > 254) return 'Email is too long';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) return 'Please enter a valid email address';
    return null;
  },
  phone: (value) => {
    const clean = sanitizePhone(value);
    if (!clean) return 'Phone number is required';
    const digits = clean.replace(/[\s\-()]/g, '');
    if (!/^\+?\d{10,15}$/.test(digits)) return 'Please enter a valid phone number';
    return null;
  },
  eventType: (value) => {
    if (!value) return 'Please select an event type';
    return null;
  },
  message: (value) => {
    const clean = sanitizeMessage(value);
    if (!clean) return 'Message is required';
    if (clean.length < 10) return 'Message must be at least 10 characters';
    if (clean.length > 2000) return 'Message must be less than 2000 characters';
    return null;
  },
};

const fieldSanitizers = {
  name: sanitizeName,
  email: sanitizeEmail,
  phone: sanitizePhone,
  eventType: (v) => sanitize(v),
  message: sanitizeMessage,
};

export function useFormValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const sanitizeValue = useCallback((name, value) => {
    const sanitizer = fieldSanitizers[name];
    return sanitizer ? sanitizer(value) : sanitize(value);
  }, []);

  const validate = useCallback((name, value) => {
    const validator = validators[name];
    if (!validator) return null;
    return validator(value);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const sanitized = sanitizeValue(name, value);
    setValues((prev) => ({ ...prev, [name]: sanitized }));
    setTouched((prev) => {
      if (prev[name]) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: validate(name, sanitized) }));
      }
      return prev;
    });
  }, [sanitizeValue, validate]);

  const handleSelectChange = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => {
      if (prev[name]) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: validate(name, value) }));
      }
      return prev;
    });
  }, [validate]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  }, [validate]);

  const validateAll = useCallback(() => {
    const allTouched = {};
    const allErrors = {};
    Object.keys(values).forEach((key) => {
      allTouched[key] = true;
      allErrors[key] = validate(key, values[key]);
    });
    setTouched(allTouched);
    setErrors(allErrors);
    return Object.values(allErrors).some(Boolean);
  }, [values, validate]);

  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleSelectChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  };
}
