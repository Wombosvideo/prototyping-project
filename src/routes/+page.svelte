<script lang="ts">
	import EventsList, { getUpcomingEvents } from "$lib/components/EventsList.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";
</script>

<PageTitle
  titleVisible="Event Manager"
  title="Home"
  descriptionVisible="Create and manage events and venues, or sign up for events."
/>
<EventsList
  title="Upcoming Events"
  events={getUpcomingEvents()}
/>
