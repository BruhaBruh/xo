export const randomId = () =>
  Math.random().toString(16).substring(2, 14).padEnd(12, '0');
