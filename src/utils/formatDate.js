export function formatDate(dateStr, locale = 'en-US', options = {}) {
  if (!dateStr) return '';

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(dateStr);
  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
}
