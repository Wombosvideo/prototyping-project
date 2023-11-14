<script lang="ts">
	import EventsList, { getUpcomingEvents, getPastEvents } from "$lib/components/EventsList.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";
  import Section from "$lib/components/Section.svelte";
</script>

<PageTitle
  titleVisible="Events"
  description="A list of all events"
/>
<EventsList
  title="Upcoming Events"
  events={getUpcomingEvents()}
/>
<EventsList
  title="Past Events"
  events={getPastEvents()}
/>
