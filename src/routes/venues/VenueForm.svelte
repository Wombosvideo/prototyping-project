<script lang="ts">
	import { enhance } from '$app/forms';
	import FormInput from '$lib/components/FormInput.svelte';
	
	export let venue: App.DTVenue;
  export let action: 'create' | 'edit';
</script>

<form class="mt-5" method='POST' action="/venues?/{action}" use:enhance>
  {#if action === 'edit'}
    <input type="hidden" name="_id" value={venue._id} />
  {/if}
  <FormInput id="name" label="Title" bind:value={venue.name} />
  <FormInput id="address" bind:value={venue.address} />
  <div class="row">
    <FormInput id="zip" label="ZIP Code" bind:value={venue.zip} half />
    <FormInput id="city" bind:value={venue.city} half />
  </div>
  <FormInput id="country" bind:value={venue.country} />
  <FormInput id="photo" label="Banner Image" bind:value={venue.photo} />

  <a href="/venues{action === 'edit' ? '/' + venue._id :''}" class="btn btn-secondary mt-3">Cancel</a>
  <input type="submit" class="btn btn-primary mt-3" value={action === 'edit' ? 'Save Changes' : 'Create Venue'}>
</form>
