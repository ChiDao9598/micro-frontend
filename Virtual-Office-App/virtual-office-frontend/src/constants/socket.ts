// Read from Vite env at build time.
// In development: set VITE_SOCKET_URL in react-app/.env.development
// In production:  set VITE_SOCKET_URL in Vercel environment variables
export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:3001';
