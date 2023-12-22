<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import { mdiAccount, mdiEmail, mdiSecurity } from "@mdi/js";
	import type { PageData } from "./$types";
	import Icon from "$lib/components/Icon.svelte";

  const getUsers = async () => {
    const res = await fetch('/api/users');
    const json = await res.json();
    console.log(json);
    return json.users as App.DTUser[];
  };

  export let data: PageData;

  let firstName = "";
  let lastName = "";
  let displayName: string;
  
  $: displayName = firstName && lastName ? `${firstName} ${lastName}` : firstName ? firstName : lastName ? lastName : "";
</script>

<PageTitle
  titleVisible="Register"
  description="Create a new account to buy tickets and manage your events."
>
<form class="mt-5" method="POST" use:enhance>
  {#if data.redirect}
    <input type="hidden" name="redirect" value={data.redirect} />
  {/if}
  <div class="row g-3 mb-3">
    <div class="col">
      <input type="text" class="form-control" name="firstName" placeholder="First name" aria-label="First name" required bind:value={firstName}>
    </div>
    <div class="col">
      <input type="text" class="form-control" name="lastName" placeholder="Last name" aria-label="Last name" required bind:value={lastName}>
    </div>
  </div>
  <div class="input-group mb-3">
    <span class="input-group-text">
      <Icon d={mdiAccount} />
    </span>
    <input type="text" class="form-control" name="displayName" placeholder="Display name" aria-label="Display name" required bind:value={displayName}>
  </div>
  <div class="input-group">
    <span class="input-group-text">
      <Icon d={mdiEmail} />
    </span>
    <input type="email" class="form-control" name="email" placeholder="Email" aria-label="Email" required>
  </div>
  <input type="submit" class="btn btn-primary mt-3" value="Register">
</form>

<p class="mt-4">Already have an account? <a href="/login">Log in here</a>.</p>
</PageTitle>
