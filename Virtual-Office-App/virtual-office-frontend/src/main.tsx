import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// This entry point is used ONLY when running the app standalone:
//   cd react-app && npm run dev
// When loaded by the host shell, spa.tsx is used instead.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
