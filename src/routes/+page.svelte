<script lang="ts">
	import EventsList, { getUpcomingEvents } from "$lib/components/EventsList.svelte";
  import Section from "$lib/components/Section.svelte";
</script>

<Section
  title="Event Manager"
  body="Create and manage events and venues, or sign up for events." kind="title"
/>
<EventsList
  title="Upcoming Events"
  events={getUpcomingEvents()}
/>
