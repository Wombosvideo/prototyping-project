<script lang="ts">
	import EventsList, { getUpcomingEvents, getPastEvents } from "$lib/components/EventsList.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";;
	import CategoryFilter from "$lib/components/CategoryFilter.svelte";

  let categories: string[] = [];
</script>

<PageTitle
  titleVisible="Events"
  description="A list of all events"
/>

<CategoryFilter bind:selection={categories}/>

<EventsList
  title="Upcoming Events"
  events={getUpcomingEvents()}
  {categories}
/>
<EventsList
  title="Past Events"
  events={getPastEvents()}
  {categories}
/>
