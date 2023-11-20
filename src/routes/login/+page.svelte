<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import type { PageData } from "./$types";

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
  descriptionVisible="Login to your account to buy tickets and manage your events."
>
{#await getUsers()}
  <p>Loading...</p>
  {:then users}
  <form class="d-grid gap-2 col-lg-3 mt-5" action="/?/login" method="POST" use:enhance>
    {#if data.redirect}
      <input type="hidden" name="redirect" value={data.redirect} />
    {/if}
    {#each users as listUser}
      <button
        class="btn btn-primary"
        disabled={$page.data.user?.id === listUser.id}
        type="submit"
        name="userid"
        value={listUser.id}
      >
        {listUser.displayName}
      </button>
    {/each}
  </form>
{/await}
</PageTitle>
