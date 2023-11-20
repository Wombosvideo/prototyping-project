<script lang="ts" context="module">
  export const getAllEvents = async () => {
    const res = await fetch('/api/events');
    const json = await res.json();
    const events = json.events as App.DTEvent[];
    return events;
  };
  export const getUpcomingEvents = async () => {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => {
      const now = new Date();
      const end = new Date(event.endDateTime);
      return end > now;
    });
  };
  export const getPastEvents = async () => {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => {
      const now = new Date();
      const end = new Date(event.endDateTime);
      return end < now;
    });
  };
</script>

<script lang="ts">
	import { page } from "$app/stores";

	import Card from "$lib/components/Card.svelte";
  import Section from "$lib/components/Section.svelte";

  export let events: Promise<App.DTEvent[]>;
  export let title: string = "Events";

  const dtFormat = new Intl.DateTimeFormat('de-CH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
</script>

<Section {title}>
  <div class="row">
    {#await events}
    <!--
      <div class="container">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    -->
      {#each { length: 3 } as _}
        <div class="col col-md-4">
          <div class="card" aria-hidden="true">
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-primary disabled placeholder col-3" aria-disabled="true"></a>
            </div>
          </div>
        </div>
      {/each}
    {:then events} 
      {#each events as {id, name, description, startDateTime, endDateTime, banner} (id)}
        {@const date = new Date(startDateTime)}
        {@const dateString = dtFormat.format(date)}
        {@const firstParagraph = description.split('\n\n')[0]}
        {@const body = firstParagraph.slice(0, 128) + (firstParagraph.length > 128 ? '&hellip;' : '')}
        <div class="col col-md-6 col-lg-4">
          <Card title={name} {body} offText={dateString} image={banner}>
            <div slot="buttons">
              {#if $page.data.user?.role === "manager"}
                <a href="/events/{id}" class="btn btn-primary">View</a>
                <a href="/events/{id}/edit" class="btn btn-secondary">Edit</a>
              {:else if $page.data.user?.role === "guest"}
                <a href="/events/{id}/signup" class="btn btn-primary">Sign Up</a>
                <a href="/events/{id}" class="btn btn-secondary">View</a>
              {:else}
                <a href="/events/{id}" class="btn btn-primary">View</a>
              {/if}
            </div>
          </Card>
        </div>
      {:else}
        <p>No upcoming events.</p>
      {/each}
    {/await}
  </div>
</Section>
