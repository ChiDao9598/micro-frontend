import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App.tsx';
import './index.css';

// This file is loaded by the host shell (single-spa).
// It exports the three lifecycle functions that single-spa calls to
// bootstrap → mount → unmount this micro frontend.

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: App,
  domElementGetter: () => document.getElementById('single-spa-application') as HTMLElement,
  errorBoundary(err: Error) {
    return (
      <div style={{ padding: '1.5rem', color: '#ff6b6b', fontFamily: 'monospace' }}>
        <strong>Virtual Office failed to load:</strong> {err.message}
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
