<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const theme = writable<'light' | 'dark'>('light');

  function applyTheme(value: 'light' | 'dark') {
    if (typeof document === 'undefined') return;
    try { document.documentElement.dataset.theme = value; } catch (e) {}
  }

  function toggleTheme() {
    theme.update((t) => {
      const next = t === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('theme', next); } catch (e) {}
      applyTheme(next);
      return next;
    });
  }

  onMount(() => {
    try {
      const saved = (localStorage.getItem('theme') as 'light' | 'dark' | null) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      theme.set(saved);
      applyTheme(saved);
    } catch (e) {}
  });
</script>

<main style="padding:2rem;">
  <h1>Theme test</h1>
  <p>Current data-theme: <strong>{typeof document !== 'undefined' ? document.documentElement.dataset.theme : 'ssr'}</strong></p>
  <button class="theme-toggle-btn" on:click={toggleTheme} style="padding:0.6rem 1rem;border-radius:8px;border:1px solid #ccc">Toggle theme</button>
</main>

<style>
  main { font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial; }
</style>
