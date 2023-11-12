<script lang="ts">
  import { page } from "$app/stores";
  import { mdiCalendarCheck } from "@mdi/js";
  import user from "$lib/stores/user";
	import Icon from "./Icon.svelte";

  const getUsers = async () => {
    const res = await fetch('/api/users');
    const json = await res.json();
    console.log(json);
    return json.users as App.DTUser[];
  };
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
    <div id="navbarNav" class="collapse navbar-collapse">
      <ul class="navbar-nav">
        {#each [
          { href: "/", label: "Home" },
          { href: "/events", label: "Events" },
          { href: "/venues", label: "Venues" },
          { href: "/categories", label: "Categories" }
        ] as { href, label}}
          {@const active = href === "/" ? $page.url.pathname === "/" : $page.url.pathname.startsWith(href)}
          <li class="nav-item">
            <a class="nav-link" href={$page.url.pathname === href ? "#" : href} class:active>{label}</a>
          </li>
        {/each}
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {$user?.displayName ?? "User"}
          </a>
          <ul class="dropdown-menu">
            {#await getUsers()}
              <li><a class="dropdown-item" href="#">Loading...</a></li>
            {:then users}
              {#each users as listUser}
                <li><a class="dropdown-item" class:active={$user?.id === listUser.id} href="#" on:click={() => {$user = listUser}}>{listUser.firstName} ({listUser.role})</a></li>
              {/each}
            {/await}
            {#if $user}
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" on:click={() => {$user = null}}>Logout</a></li>
            {/if}
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
  .navbar-collapse {
    flex-grow: 0;
  }
</style>
