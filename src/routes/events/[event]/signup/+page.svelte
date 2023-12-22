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
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Property</th>
        <th scope="col">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Event</th>
        <td>{data.event.name}</td>
      </tr>
      <tr>
        <th scope="row">Date</th>
        <td>{start.toLocaleDateString()}</td>
      </tr>
      <tr>
        <th scope="row">Time</th>
        <td>{start.toLocaleTimeString()} - {end.toLocaleTimeString()}</td>
      </tr>
      <tr>
        <th scope="row">Location</th>
        <td>{data.event.venue}</td>
      </tr>
      <tr>
        <th scope="row">Price</th>
        <td>{@html data.event.price == 0 ? 'Free' : data.event.price % 1 === 0 ? data.event.price + '.&ndash;' : data.event.price.toFixed(2)}&nbsp;Fr.</td>
      </tr>
    </tbody>
  </table>
</Section>
