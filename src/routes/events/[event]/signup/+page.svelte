<script lang="ts">
	import PageTitle from "$lib/components/PageTitle.svelte";
	import Section from "$lib/components/Section.svelte";
	import type { PageData } from "./$types";

  export let data: PageData;

  $: start = new Date(data.event.startDateTime);
  $: end = new Date(data.event.endDateTime);
</script>

<PageTitle titleVisible="Sign Up" descriptionVisible="Sign up for {data.event.name}." />

<Section title="Ticket Info">
  <p>
    <strong>Event:</strong> {data.event.name}
  </p>
  <p>
    <strong>Date:</strong> {start.toLocaleDateString()}
  </p>
  <p>
    <strong>Time:</strong> {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
  </p>
  <p>
    <strong>Location:</strong> {data.event.venueId}
  </p>
  <p>
    <strong>Price:</strong> {@html data.event.price == 0 ? 'Free' : data.event.price % 1 === 0 ? data.event.price + '.&ndash;' : data.event.price.toFixed(2)}&nbsp;Fr.
  </p>
</Section>
