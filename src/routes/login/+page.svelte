<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import { mdiAccount, mdiSecurity } from "@mdi/js";
	import type { PageData } from "./$types";
	import Icon from "$lib/components/Icon.svelte";

  const getUsers = async () => {
    const res = await fetch('/api/users');
    const json = await res.json();
    console.log(json);
    return json.users as App.DTUser[];
  };

  export let data: PageData;
</script>

<PageTitle
  titleVisible="Login"
  description="Login to your account to buy tickets and manage your events."
>
{#await getUsers()}
  <p>Loading...</p>
  {:then users}
  <form class="d-grid gap-2 col-lg-3 mt-5" action="/?/login" method="POST" use:enhance>
    {#if data.redirect}
      <input type="hidden" name="redirect" value={data.redirect} />
    {/if}
    {#each users as {_id, displayName, role} (_id)}
      <button
        class="btn btn-primary"
        disabled={$page.data.user?._id.toString() === _id.toString()}
        type="submit"
        name="userid"
        value={_id.toString()}
      >
        <Icon d={role === 'manager' ? mdiSecurity : mdiAccount} />
        {displayName}
      </button>
    {/each}
  </form>
{/await}

<p class="mt-4">No account yet? <a href="/register" tabindex="0">Register here</a>.</p>
</PageTitle>
