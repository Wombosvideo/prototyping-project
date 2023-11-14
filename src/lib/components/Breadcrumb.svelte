<script lang="ts">
	import { page } from "$app/stores";

  export let current: string = $page.url.pathname;
  export let links: { href: string; label: string }[] = [];

  const genericLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/events/new", label: "New Event" },
    { href: "/venues", label: "Venues" },
    { href: "/venues/new", label: "New Venue" },
    { href: "/categories", label: "Categories" },
    { href: "/categories/new", label: "New Category" },
  ];

  $: breadcrumbs = [...genericLinks, ...links].filter((link) => current.startsWith(link.href));

  export function update() {
    breadcrumbs = [...genericLinks, ...links].filter((link) => current.startsWith(link.href));
  }
</script>

<nav class="pb-4" aria-label="breadcrumb">
  <ol class="breadcrumb">
    {#each breadcrumbs as { href, label } (href)}
      {@const active = current === href}
      <li class="breadcrumb-item" class:active aria-current={active ? "page" : undefined}>
        {#if active}
          {label}
        {:else}
          <a {href}>{label}</a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
