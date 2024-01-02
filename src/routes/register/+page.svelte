<script lang="ts">
	import { enhance } from "$app/forms";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import type { PageData } from "./$types";
	import FormInput from "$lib/components/FormInput.svelte";

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
  let email = "";
  
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
  <div class="row">
    <FormInput id="firstName" label="First name" bind:value={firstName} half />
    <FormInput id="lastName" label="Last name" bind:value={lastName} half />
  </div>
  <FormInput id="displayName" label="Display name" bind:value={displayName} />
  <FormInput id="email" label="E-Mail address" bind:value={email} />
  <input type="submit" class="btn btn-primary mt-3" value="Register">
</form>

<p class="mt-4">Already have an account? <a href="/login" tabindex="0">Log in here</a>.</p>
</PageTitle>
