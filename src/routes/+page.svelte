<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import user from "$lib/stores/user";

  const getEvents = async () => {
    const res = await fetch('/api/events');
    const json = await res.json();
    console.log(json);
    return json.events as App.DTEvent[];
  };

  const dtFormat = new Intl.DateTimeFormat('de-CH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
</script>

<section class="mb-5">
  <h1>Event Manager</h1>
  <p>Create and manage events and venues, or sign up for events.</p>
</section>

<h2 class="mb-4">Upcoming Events</h2>
<div class="row">
  {#await getEvents()}
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
            <a href="/events/{id}" class="btn btn-primary">View</a>
            {#if $user?.role === "manager"}
              <a href="/events/{id}/edit" class="btn btn-secondary">Edit</a>
            {:else if $user?.role === "guest"}
              <a href="/events/{id}/signup" class="btn btn-secondary">Sign Up</a>
            {/if}
          </div>
        </Card>
      </div>
    {/each}
  {/await}
</div>
