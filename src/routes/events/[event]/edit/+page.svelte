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
<p>This page is not implemented yet. In the future, you will be able to edit the event "{data.event.name}" here.</p>
