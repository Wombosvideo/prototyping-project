<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	import PageTitle from "$lib/components/PageTitle.svelte";
	import Section from "$lib/components/Section.svelte";
	import { getVenues } from "$lib/util/api";
  import Icon from "$lib/components/Icon.svelte";
	import { mdiPlus } from "@mdi/js";

  export let data: PageData;
</script>

<PageTitle
  titleVisible="Venues"
  description="A list of all event venues"
>
  <svelte:fragment slot="actions">
    {#if data.user?.role === 'manager'}
      <a href="{$page.url.pathname}/new" type="button" class="btn btn-secondary rounded-pill"><Icon d={mdiPlus}/></a>
    {/if}
  </svelte:fragment>
</PageTitle>

<Section title="All Venues">
  {#await getVenues()}
    <p>Loading...</p>
  {:then venues}
    <div class="list-group">
      {#each venues as { _id, name, city, country, photo: src, eventCount } (_id)}
        <a href="/venues/{_id}" class="list-group-item list-group-item-action d-flex gap-3 p-3" aria-label="{name} - {city}: {eventCount} Events">
          <img {src} alt={name} class="rounded-2 mr-3">
          <div class="d-grid flex-grow-1">
            <h5 class="mb-1">{name}</h5>
            <small class="text-muted">{city}, {country}</small>
          </div>
          {#if eventCount > 0}
            <span class="badge bg-primary align-self-start">{eventCount} Event{#if eventCount > 1}s{/if}</span>
          {/if}
        </a>
      {/each}
    </div>
  {/await}
</Section>

<style>
  img {
    width: 6rem;
  }
</style>
