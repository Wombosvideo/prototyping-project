<script lang="ts">
	import Breadcrumb from "$lib/components/Breadcrumb.svelte";
	import EventsList, { getUpcomingEvents } from "$lib/components/EventsList.svelte";
  import Section from "$lib/components/Section.svelte";
</script>

<Breadcrumb />
<Section
  title="Event Manager"
  body="Create and manage events and venues, or sign up for events." kind="title"
/>
<EventsList
  title="Upcoming Events"
  events={getUpcomingEvents()}
/>
