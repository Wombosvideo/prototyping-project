<script lang="ts">
	import { page } from "$app/stores";

  export let current: string = $page.url.pathname.endsWith("/") ? $page.url.pathname : $page.url.pathname + "/";
  export let links: { href: string; label: string }[] = [];

  const genericLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/events/new", label: "New Event" },
    { href: "/venues", label: "Venues" },
    { href: "/venues/new", label: "New Venue" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ];

  $: breadcrumbs = [...genericLinks, ...links].filter((link) => current.startsWith(link.href));

  export function update() {
    breadcrumbs = [...genericLinks, ...links].filter((link) => current.startsWith(link.href));
  }
</script>

<nav aria-label="breadcrumb">
  <ol class="breadcrumb mb-0">
    {#each breadcrumbs as { href, label } (href)}
      {@const active = current === href}
      <li class="breadcrumb-item" class:active aria-current={active ? "page" : undefined}>
        {#if active}
          {label}
        {:else}
          <a {href} tabindex="0">{label}</a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
