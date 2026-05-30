import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './App.jsx';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => document.getElementById('single-spa-application'),
  errorBoundary(err) {
    return <div>Coffee App failed to load: {err.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
