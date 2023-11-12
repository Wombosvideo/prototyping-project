<script lang="ts">
  import { page } from "$app/stores";
  import { mdiCalendarCheck } from "@mdi/js";
	import Icon from "./Icon.svelte";
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container">
    <a class="navbar-brand" href="/">
      <Icon d={ mdiCalendarCheck } alt="Calendar" />
      Event Manager
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav">
        {#each [
          { href: '/', label: 'Home' },
          { href: '/events', label: 'Events' },
          { href: '/venues', label: 'Venues' },
          { href: '/categories', label: 'Categories' }
        ] as { href, label}}
          {@const active = (href === '/' && $page.url.pathname === '/') || $page.url.pathname.startsWith(href)}
          <li class="nav-item">
            <a class="nav-link" href={$page.url.pathname === href ? "#" : href} class:active>{label}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>

<style>
  .navbar-collapse {
    flex-grow: 0;
  }
</style>
