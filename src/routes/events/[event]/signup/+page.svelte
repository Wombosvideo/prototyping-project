<script lang="ts">
	import { page } from "$app/stores";
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
      {#each [
        ['Event', data.event.name],
        ['Date', start.toLocaleDateString()],
        ['Time', start.toLocaleTimeString() + ' - ' + end.toLocaleTimeString()],
        ['Location', data.event.venue.name + ' (' + data.event.venue.city + ', ' + data.event.venue.country + ')'],
        ['Price', data.event.price == 0 ? 'Free' : data.event.price % 1 === 0 ? data.event.price + '.&ndash;' : data.event.price.toFixed(2) + '&nbsp;Fr.']
      ] as [key, value]}
        <tr>
          <th scope="row">{key}</th>
          <td>{@html value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</Section>
<Section title="Confirmation">
  <p>Are you sure you want to sign up for this event?</p>
  <form action="{$page.url.pathname}" method="POST">
    <input type="hidden" name="event" value="{data.event._id}" />
    <input type="hidden" name="user" value="{data.user._id}" />
    <a href="{$page.url.pathname.slice(0, -7)}" type="button" class="btn btn-secondary">Cancel</a>
    <button type="submit" class="btn btn-primary">Sign Up</button>
  </form>
</Section>
