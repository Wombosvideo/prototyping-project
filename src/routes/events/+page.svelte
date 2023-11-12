<script lang="ts">
	import EventsList, { getUpcomingEvents, getPastEvents } from "$lib/components/EventsList.svelte";
  import Section from "$lib/components/Section.svelte";
</script>

<Section
  title="Events"
/>
<EventsList
  title="Upcoming Events"
  events={getUpcomingEvents()}
/>
<EventsList
  title="Past Events"
  events={getPastEvents()}
/>
