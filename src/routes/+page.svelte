<script lang="ts">
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

<h1>Event Manager</h1>
<p>Create and manage events and venues, or sign up for events.</p>

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
      <div class="col-md-4">
        <div class="card mb-4 box-shadow">
          <div class="card-body">
            <h3>{name}</h3>
            <p class="card-text">{description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="/events/{id}" class="btn btn-sm btn-outline-secondary">View</a>
                <!--
                {#if user && user.id === event.user_id}
                  <a href="/events/{event.id}/edit" class="btn btn-sm btn-outline-secondary">Edit</a>
                {/if}
                -->
              </div>
              <small class="text-muted">{dateString}</small>
            </div>
          </div>
        </div>
      </div>
    {/each}
  {/await}
</div>
