<script lang="ts">
  import { page } from "$app/stores";
  import { mdiCalendarCheck } from "@mdi/js";
	import Icon from "./Icon.svelte";
	import { enhance } from "$app/forms";
	import { getUsers } from "$lib/util/api";
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container">
    <a class="navbar-brand" href="/" tabindex="0">
      <Icon d={ mdiCalendarCheck } alt="Calendar" />
      Event Manager
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" tabindex="0">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="navbarNav" class="collapse navbar-collapse">
      <ul class="navbar-nav">
        {#each [
          { href: "/", label: "Home" },
          { href: "/events", label: "Events" },
          { href: "/venues", label: "Venues" }
        ] as { href, label}}
          {@const active = href === "/" ? $page.url.pathname === "/" : $page.url.pathname.startsWith(href)}
          <li class="nav-item">
            <a class="nav-link" href={$page.url.pathname === href ? "#" : href} class:active aria-current={$page.url.pathname === href ? "page" : undefined} tabindex="0">{label}</a>
          </li>
        {/each}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" tabindex="0">
            {$page.data.user?.displayName ?? "User"}
          </a>
          <ul class="dropdown-menu">
            {#await getUsers()}
              <li><a class="dropdown-item" href="#">Loading...</a></li>
            {:then users}
              <form action="/?/login" method="POST" use:enhance>
                {#each users as listUser}
                  <li>
                    <button
                      class="dropdown-item"
                      class:active={$page.data.user?._id === listUser._id}
                      type="submit"
                      name="userid"
                      value={listUser._id}
                      tabindex="0"
                    >
                      {listUser.firstName} ({listUser.role})
                    </button>
                  </li>
                {/each}
              </form>
            {/await}
            <li><hr class="dropdown-divider"></li>
            {#if $page.data.user}
              <li>
                <form action="/?/logout" method="POST" use:enhance>
                  <button class="dropdown-item" type="submit">
                    Logout
                  </button>
                </form>
              </li>
            {:else}
              <li>
                <a class="dropdown-item" href="/login?redirect={$page.url.pathname}">
                  Login
                </a>
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
