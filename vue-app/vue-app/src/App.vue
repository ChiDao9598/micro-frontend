<template>
  <div class="vue-app">
    <div class="app-header">
      <span class="app-badge">Vue 3</span>
      <h1>Vue App</h1>
      <p>This is the Vue micro frontend running inside the host shell.</p>
    </div>
    <div class="app-body">
      <p>
        Build your Vue app content here. This component works both as a
        <strong>standalone app</strong> and as a <strong>micro frontend</strong> inside the host.
      </p>
    </div>
  </div>
</template>

<script setup>
// Build your Vue app here
</script>

<style scoped>
.vue-app {
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.app-header {
  margin-bottom: 2rem;
}

.app-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(66, 184, 131, 0.15);
  color: #42B883;
  border: 1px solid rgba(66, 184, 131, 0.3);
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.app-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.app-header p {
  color: #888;
}

.app-body {
  max-width: 600px;
  line-height: 1.7;
  color: #ccc;
}
</style>
