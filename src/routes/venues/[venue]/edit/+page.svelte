<script lang="ts">
  import type { PageData } from './$types';
	import PageTitle from '$lib/components/PageTitle.svelte';
	
	export let data: PageData;
</script>

<PageTitle
  titleVisible="{data.venue.name} - Edit"
  description="Edit the venue {data.venue.name}."
/>

<!-- TODO: Wizard to edit a venue -->
<p>This page is not implemented yet. In the future, you will be able to edit the venue "{data.venue.name}" here.</p>
