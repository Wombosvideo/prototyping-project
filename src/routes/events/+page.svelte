<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import EventsList, { getUpcomingEvents, getPastEvents } from "$lib/components/EventsList.svelte";
  import Section from "$lib/components/Section.svelte";
</script>

<Breadcrumb />
<Section
  title="Events"
  kind="title"
/>
<EventsList
  title="Upcoming Events"
  events={getUpcomingEvents()}
/>
<EventsList
  title="Past Events"
  events={getPastEvents()}
/>
