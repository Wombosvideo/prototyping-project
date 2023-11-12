<script lang="ts">
  import type { PageData } from './$types';
  import Section from "$lib/components/Section.svelte";
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	
	export let data: PageData;
</script>

<Breadcrumb links={[ { href: `/events/${data.event.id}`, label: data.event.name } ]} />
<Section
  title={data.event.name}
  body={data.event.description}
  kind="title"
/>
