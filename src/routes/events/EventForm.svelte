<script lang="ts">
	import { enhance } from '$app/forms';
	import FormInput from '$lib/components/FormInput.svelte';
	
	export let event: App.DTEvent;
  export let action: 'create' | 'edit';

  let venueId = (event.venue as any)?._id || undefined;
  event.categories = event.categories || [];
</script>

<form class="mt-5" method='POST' action="/events?/{action}" use:enhance>
  {#if action === 'edit'}
    <input type="hidden" name="_id" value={event._id} />
  {/if}
  <FormInput id="name" label="Title" bind:value={event.name} />
  <FormInput id="description" type="textarea" bind:value={event.description} />
  <div class="row">
    <FormInput id="startDateTime" label="Start date & time" type="datetime" bind:value={event.startDateTime} half />
    <FormInput id="endDateTime" label="End date & time" type="datetime" bind:value={event.endDateTime} half />
  </div>
  <FormInput id="banner" label="Banner Image" bind:value={event.banner} />
  <FormInput id="venue" type="venue" bind:value={venueId} />
  <FormInput id="price" type="number" bind:value={event.price} />
  <FormInput id="maxParticipants" type="number" bind:value={event.maxParticipants} />
  <FormInput id="categories" type="categories" bind:value={event.categories} />

  <a href="/events{action === 'edit' ? '/' + event._id :''}" class="btn btn-secondary mt-3" tabindex="0">Cancel</a>
  <input type="submit" class="btn btn-primary mt-3" value={action === 'edit' ? 'Save Changes' : 'Create Event'}>
</form>
