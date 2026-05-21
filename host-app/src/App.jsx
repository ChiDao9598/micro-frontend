import React from 'react';
import Navbar from './components/Navbar.jsx';
import MountPoint from './components/MountPoint.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

export default function App() {
  return (
    // AuthProvider wraps everything so remotes can access auth state if needed
    <AuthProvider>
      <div className="app-shell">
        <Navbar />

        {/* The active micro frontend mounts here */}
        <main className="app-content">
          <MountPoint />
        </main>
      </div>
    </AuthProvider>
  );
}
