<script lang="ts">
	import EventsList, { getEvents } from "$lib/components/EventsList.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";
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
    events={getEvents({ by: data.user._id }, true, true)}
  />
{/if}
<EventsList
  title="Upcoming Events"
  events={getEvents(undefined, false, true)}
/>
