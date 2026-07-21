export const sanitize = (value) => {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[<>"'&]/g, '')
    .trim();
};

export const sanitizeName = (value) => {
  return sanitize(value).replace(/[^a-zA-Z\s'-]/g, '');
};

export const sanitizeEmail = (value) => {
  return sanitize(value).toLowerCase();
};

export const sanitizePhone = (value) => {
  return sanitize(value).replace(/[^+\d\s\-()]/g, '');
};

export const sanitizeMessage = (value) => {
  return sanitize(value);
};
