<script lang="ts">
  import type { PageData } from './$types';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import EventForm from '../../EventForm.svelte';
	
	export let data: PageData;

  let event = data.event;
</script>

<PageTitle
  titleVisible="{event.name} - Edit"
  description="Edit the event {event.name}."
>
  <EventForm bind:event action="edit" />
</PageTitle>
