export const api = 'http://backend:5000';

export const nextApi =
  process.env.NODE_ENV === 'production'
    ? 'https://something/api'
    : 'http://localhost:3000/api';
