import React, { useEffect, useState } from 'react';
import { addErrorHandler, removeErrorHandler, navigateToUrl } from 'single-spa';
import "../assets/css/mountpoint.css";

export default function MountPoint() {
  const [error, setError] = useState(null);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    // Keep path state in sync with Single-SPA navigation
    const onNav = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onNav);
    window.addEventListener('single-spa:routing-event', onNav);
    return () => {
      window.removeEventListener('popstate', onNav);
      window.removeEventListener('single-spa:routing-event', onNav);
    };
  }, []);

  useEffect(() => {
    const errorHandler = (err) => {
      console.error('Micro frontend error:', err);
      setError(`Failed to load: ${err.appOrParcelName}`);
    };
    addErrorHandler(errorHandler);
    return () => removeErrorHandler(errorHandler);
  }, []);

  const isHome = path === '/';

  const APPS = [
    { name: 'React',   href: '/react-app',   color: '#61DAFB', desc: 'Built with React 18' },
    { name: 'Vue',     href: '/vue-app',     color: '#42B883', desc: 'Built with Vue 3' },
    { name: 'Angular', href: '/angular-app', color: '#DD0031', desc: 'Built with Angular' },
    { name: 'Svelte',  href: '/svelte-app',  color: '#FF3E00', desc: 'Built with Svelte' },
  ];

  return (
    <>
      {/* Home page — visible only on "/" */}
      {isHome && (
        <div className="home-page">
          <div className='introduction'>
              <h1>Code with CD</h1>
              <p>
                This app is built with <strong>Micro Frontend</strong> architecture.
              </p>
              <p>Each section is an independently deployed app using a different framework.</p>
          </div>
          <div className="framework-grid">
            {APPS.map(({ name, href, color, desc }) => (
              <a
                key={href}
                href={href}
                className="framework-card"
                style={{ '--accent': color }}
                onClick={(e) => { e.preventDefault(); navigateToUrl(href); }}
              >
                <span className="card-name">{name}</span>
                <span className="card-desc">{desc}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ALWAYS in the DOM — Single-SPA mounts the active remote here.
          Must never be conditionally removed, or Single-SPA loses its mount target. */}
      <div id="single-spa-application" />

      {error && (
        <div className="error-banner">
          <strong>Error:</strong> {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
    </>
  );
}
