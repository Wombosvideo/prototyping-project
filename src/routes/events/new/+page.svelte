<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte';
	import EventForm from '../EventForm.svelte';

  let event = {} as App.DTEvent;
</script>

<PageTitle
  titleVisible="Create Event"
  description="Create a new event."
>
  <EventForm bind:event action="create" />
</PageTitle>
