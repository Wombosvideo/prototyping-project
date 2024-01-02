<script lang="ts">
  import type { PageData } from './$types';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import VenueForm from '../../VenueForm.svelte';
	
	export let data: PageData;

  let venue = data.venue;
</script>

<PageTitle
  titleVisible="{venue.name} - Edit"
  description="Edit the venue {venue.name}."
>
  <VenueForm bind:venue action="edit" />
</PageTitle>
