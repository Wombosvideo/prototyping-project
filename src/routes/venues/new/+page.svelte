<script lang="ts">
  import PageTitle from '$lib/components/PageTitle.svelte';
	import VenueForm from '../VenueForm.svelte';

  let venue = {} as App.DTVenue;
</script>

<PageTitle
  titleVisible="Create Venue"
  description="Create a new event venue."
>
  <VenueForm bind:venue action="create" />
</PageTitle>
