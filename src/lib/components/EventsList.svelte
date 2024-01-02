<script lang="ts" context="module">
  export const getEvents = async (params?: Record<string, string> | undefined, includePastEvents?: boolean, includeUpcomingEvents?: boolean) => {
    const paramsStr = params ? Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&') : '';
    const res = await fetch('/api/events' + (paramsStr ? '?' + paramsStr : ''));
    const json = await res.json();
    const events = json.events as App.DTEvent[];
    const now = new Date();
    return events.filter((event) => {
      const end = new Date(event.endDateTime);
      return (includePastEvents !== false && end < now) || (includeUpcomingEvents !== false && end > now);
    });
  };
</script>

<script lang="ts">
	import { page } from "$app/stores";

	import Card from "$lib/components/Card.svelte";
  import Section from "$lib/components/Section.svelte";

  export let events: Promise<App.DTEvent[]>;
  export let categories: string[] = [];
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
      {#each { length: 3 } as _}
        <div class="col col-md-4">
          <div class="card" aria-hidden="true">
            <!-- svelte-ignore a11y-missing-content -->
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
              <!-- svelte-ignore a11y-missing-attribute -->
              <a class="btn btn-primary disabled placeholder col-3" aria-disabled="true"></a>
            </div>
          </div>
        </div>
      {/each}
    {:then events} 
      {#each events as {_id, name: title, description, startDateTime, banner: image, managers, categories: ec} (_id)}
        {#if categories.length === 0 || ec.some((category) => categories.includes(category))}
          {@const date = new Date(startDateTime)}
          {@const offText = dtFormat.format(date)}
          {@const firstParagraph = description.split('\n\n')[0]}
          {@const body = firstParagraph.slice(0, 128) + (firstParagraph.length > 128 ? '&hellip;' : '')}
          {@const href = `/events/${_id}`}
          {@const myEvent = $page.data.user?.role === "manager" && managers.includes($page.data.user?._id)}
          <div class="col col-md-6 col-lg-4">
            <Card {title} {body} {offText} {image}>
              <div slot="buttons">
                {#if myEvent}
                  <a {href} class="btn btn-primary" tabindex="0">View</a>
                  <a href="{href}/edit" class="btn btn-secondary" tabindex="0">Edit</a>
                {:else if $page.data.user?.role === "guest"}
                  <a {href} class="btn btn-primary" tabindex="0">View</a>
                  {#if date > new Date()}
                    <a href="{href}/signup" class="btn btn-secondary" tabindex="0">Sign Up</a>
                  {/if}
                {:else}
                  <a {href} class="btn btn-primary" tabindex="0"  >View</a>
                {/if}
              </div>
            </Card>
          </div>
        {/if}
      {:else}
        <p>No events.</p>
      {/each}
    {/await}
  </div>
</Section>
