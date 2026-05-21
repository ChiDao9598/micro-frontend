import './index.css';
import App from './App.svelte';

// Svelte doesn't have an official single-spa package,
// so we write the lifecycle functions manually — it's straightforward.

let svelteInstance = null;

export async function bootstrap() {
  // Nothing to do here
}

export async function mount(props) {
  const domElement = document.getElementById('single-spa-application');
  svelteInstance = new App({
    target: domElement,
    props: {
      // Pass any Single-SPA props to the Svelte app if needed
      singleSpaProps: props,
    },
  });
}

export async function unmount() {
  if (svelteInstance) {
    svelteInstance.$destroy();
    svelteInstance = null;
  }
}
