<script lang="ts">
  import type { PageData } from './$types';
  import Section from "$lib/components/Section.svelte";
	
	export let data: PageData;
</script>

<Section
  title={data.event.name}
  body={data.event.description}
  kind="title"
/>
