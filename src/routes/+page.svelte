<script lang="ts">
	import EventsList, { getAllEventsBy, getUpcomingEvents } from "$lib/components/EventsList.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import Section from "$lib/components/Section.svelte";
	import type { PageData } from "./$types";
  
  export let data: PageData;
</script>

<PageTitle
  titleVisible="Event Manager"
  title="Home"
  descriptionVisible="Create and manage events and venues, or sign up for events."
/>
{#if data.user?.role === "manager"}
  <EventsList
    title="My Events"
    events={getAllEventsBy(data.user?._id)}
  />
{/if}
<EventsList
  title="Upcoming Events"
  events={getUpcomingEvents()}
/>
