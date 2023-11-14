<script lang="ts">
  import { page } from "$app/stores";
  import { mdiCalendarCheck } from "@mdi/js";
	import Icon from "./Icon.svelte";
	import { enhance } from "$app/forms";

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
            <a class="nav-link" href={$page.url.pathname === href ? "#" : href} class:active aria-current={$page.url.pathname === href ? "page" : undefined}>{label}</a>
          </li>
        {/each}
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {$page.data.user?.displayName ?? "User"}
          </a>
          <ul class="dropdown-menu">
            {#await getUsers()}
              <li><a class="dropdown-item" href="#">Loading...</a></li>
            {:then users}
              <form action="/?/login" method="POST" use:enhance>
                {#each users as listUser}
                  <li>
                    <button class="dropdown-item" class:active={$page.data.user?.id === listUser.id} type="submit" name="userid" value={listUser.id}>
                      {listUser.firstName} ({listUser.role})
                    </button>
                  </li>
                {/each}
              </form>
            {/await}
            {#if $page.data.user}
              <li><hr class="dropdown-divider"></li>
              <li>
                <form action="/?/logout" method="POST" use:enhance>
                  <button class="dropdown-item" type="submit">
                    Logout
                  </button>
                </form>
              </li>
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
