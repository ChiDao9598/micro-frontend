import React, { createContext, useContext, useState } from 'react';

// This context is the "shared state" layer between the shell and remotes.
// Remotes can access this via a shared utility package (advanced) or
// via CustomEvents (simple approach used here).

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in

  function login(userData) {
    setUser(userData);
    // Broadcast to all micro frontends via a custom event
    window.dispatchEvent(new CustomEvent('auth:login', { detail: userData }));
  }

  function logout() {
    setUser(null);
    window.dispatchEvent(new CustomEvent('auth:logout'));
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for use inside the shell's own React components
export function useAuth() {
  return useContext(AuthContext);
}

// ─────────────────────────────────────────────────────────────
// How remotes can listen to auth events (in any framework):
//
//   window.addEventListener('auth:login', (e) => {
//     const user = e.detail;
//     // update local state in Vue / Angular / Svelte
//   });
//
//   window.addEventListener('auth:logout', () => {
//     // clear local state
//   });
// ─────────────────────────────────────────────────────────────
