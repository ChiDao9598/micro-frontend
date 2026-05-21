<script>
  export let singleSpaProps = null;
  // Build your Svelte app here
</script>

<div class="svelte-app">
  <div class="app-header">
    <span class="app-badge">Svelte 4</span>
    <h1>Svelte App</h1>
    <p>This is the Svelte micro frontend running inside the host shell.</p>
  </div>
  <div class="app-body">
    <p>
      Build your Svelte app content here. This component works both as a
      <strong>standalone app</strong> and as a <strong>micro frontend</strong> inside the host.
    </p>
  </div>
</div>

<style>
  .svelte-app {
    padding: 2rem;
    font-family: system-ui, -apple-system, sans-serif;
  }

  .app-header {
    margin-bottom: 2rem;
  }

  .app-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: rgba(255, 62, 0, 0.15);
    color: #FF3E00;
    border: 1px solid rgba(255, 62, 0, 0.3);
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .app-header p { color: #888; }

  .app-body {
    max-width: 600px;
    line-height: 1.7;
    color: #ccc;
  }
</style>
