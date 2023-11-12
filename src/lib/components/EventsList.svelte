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
	import Card from "$lib/components/Card.svelte";
  import Section from "$lib/components/Section.svelte";
	import user from "$lib/stores/user";

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
      <div class="container">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    {:then events} 
      {#each events as {id, name, description, startDateTime, endDateTime} (id)}
        {@const date = new Date(startDateTime)}
        {@const dateString = dtFormat.format(date)}
        <div class="col col-md-4">
          <Card title={name} body={description} offText={dateString}>
            <div slot="buttons">
              {#if $user?.role === "manager"}
                <a href="/events/{id}" class="btn btn-primary">View</a>
                <a href="/events/{id}/edit" class="btn btn-secondary">Edit</a>
              {:else if $user?.role === "guest"}
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
