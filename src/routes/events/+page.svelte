<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import CategoryFilter from "$lib/components/CategoryFilter.svelte";
	import EventsList from "$lib/components/EventsList.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import { mdiPlus } from "@mdi/js";
	import { getEvents } from "$lib/util/api";

  let categories: string[] = [];
  export let data: PageData;
</script>

<PageTitle
  titleVisible="Events"
  description="A list of all events"
>
  <svelte:fragment slot="actions">
    {#if data.user?.role === 'manager'}
      <a href="{$page.url.pathname}/new" type="button" class="btn btn-secondary rounded-pill" aria-label="Create event" tabindex="0"><Icon d={mdiPlus}/></a>
    {/if}
  </svelte:fragment>
</PageTitle>

<CategoryFilter bind:selection={categories}/>

<EventsList
  title="Upcoming Events"
  events={getEvents(undefined, false, true)}
  {categories}
/>
<EventsList
  title="Past Events"
  events={getEvents(undefined, true, false)}
  {categories}
/>
