<script lang="ts">
	import { page } from "$app/stores";
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
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
  {#key $page.url.pathname}
    <Breadcrumb current={$page.url.pathname} links={$page.data.breadcrumbs} />
  {/key}
  <slot />
</main>

<style>
  :root {
    --bs-primary: #0E76A8;
    --bs-primary-rgb: 14, 118, 168;
  }
  :global(.bg-primary) {
    --bs-border-color-translucent: rgba(var(--bs-primary-rgb), 0.8);
  }
  :global(.btn-primary) {
    --bs-btn-bg: #0E76A8;
    --bs-btn-border-color: #0E76A8;
    --bs-btn-hover-bg: #0D638B;
    --bs-btn-hover-border-color: #0D5E83;
    --bs-btn-active-bg: #0D5E83;
    --bs-btn-active-border-color: #0D5E83;
  }
  :global(.dropdown-menu) {
    --bs-dropdown-link-active-bg: var(--bs-primary);
  }
</style>
