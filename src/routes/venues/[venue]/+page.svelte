<script lang="ts">
  import BannerContainer from '$lib/components/BannerContainer.svelte';

  import type { PageData } from './$types';
  import PageTitle from '$lib/components/PageTitle.svelte';
  import { page } from '$app/stores';
	import EventsList, { getEvents } from '$lib/components/EventsList.svelte';

  export let data: PageData;

  $: venue = data.venue;
</script>

{#if venue.photo}
  <BannerContainer img={venue.photo} alt="Photo of {venue.name} ({venue.city}, {venue.country})"></BannerContainer>
{/if}
<PageTitle
  titleVisible={venue.name}
  descriptionVisible={`<b>Address:</b>&nbsp;<p>${venue.address}<br>${venue.zip} ${venue.city}<br>${venue.country}</p>`}
  titleClass={venue.photo ? 'text-white' : ''}
>
  <svelte:fragment slot="actions">
    {#if data.user?.role === 'manager'}
      <a href="{$page.url.pathname}/edit" type="button" class="btn btn-secondary" tabindex="0">Edit</a>
    {/if}
  </svelte:fragment>
</PageTitle>
<EventsList events={getEvents({at: venue._id}, false)} title="Upcoming Events"></EventsList>
