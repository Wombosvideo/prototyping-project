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

  {#if action === 'edit'}
    <button type="button" class="btn btn-danger mt-3" data-bs-toggle="modal" data-bs-target="#mdConfirmDelete">Delete Event</button>
  {/if}
  <a href="/events{action === 'edit' ? '/' + event._id :''}" class="btn btn-secondary mt-3" tabindex="0">Cancel</a>
  <input type="submit" class="btn btn-primary mt-3" value={action === 'edit' ? 'Save Changes' : 'Create Event'}>
</form>

{#if action === 'edit'}
  <div class="modal fade" id="mdConfirmDelete" tabindex="-1" aria-labelledby="mdConfirmDeleteLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <header class="modal-header">
          <h1 class="modal-title fs-5" id="mdConfirmDeleteLabel">Delete Event</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </header>
        <div class="modal-body">
          <p>Are you sure you want to delete this event?</p>
        </div>
        <footer class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <form method='POST' action="/events?/delete" use:enhance>
            <input type="hidden" name="_id" value={event._id} />
            <input type="submit" class="btn btn-danger" value="Delete Event" data-bs-dismiss="modal" />
          </form>
        </footer>
      </div>
    </div>
  </div>
{/if}
