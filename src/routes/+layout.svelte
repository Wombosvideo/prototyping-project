<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	import { onMount } from "svelte";

  onMount(() => {
    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const light = window.matchMedia('(prefers-color-scheme: light)');
    dark.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
      }
    });
    light.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.setAttribute('data-bs-theme', 'light');
      }
    });
    if (dark.matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else if (light.matches) {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  });
</script>

<Navbar />

<main class="container my-5">
  <slot />
</main>

<style>
  :root {
    --bs-primary: #0E76A8;
    --bs-primary-rgb: 14, 118, 168;
  }
</style>
