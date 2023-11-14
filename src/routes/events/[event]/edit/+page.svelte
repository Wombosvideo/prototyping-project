<script lang="ts">
  import type { PageData } from './$types';
	import PageTitle from '$lib/components/PageTitle.svelte';
	
	export let data: PageData;
</script>

<PageTitle
  titleVisible="{data.event.name} - Edit"
  description="Edit the event {data.event.name}."
/>

<!-- TODO: Wizard to edit an event -->
