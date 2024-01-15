<script lang="ts">
  import type { PageData } from './$types';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Section from '$lib/components/Section.svelte';
	import { page } from '$app/stores';
	import BannerContainer from '$lib/components/BannerContainer.svelte';
	
	export let data: PageData;

  $: start = new Date(data.event.startDateTime);
  $: end = new Date(data.event.endDateTime);
  $: now = new Date();
  $: [firstParagraph, ...rest] = data.event.description.split(/\r?\n\r?\n/g);
  $: body = firstParagraph + '\n\n' + `📅 <b>Date:</b> ${start.toLocaleDateString(undefined, {dateStyle: 'full'})}  \n🕖 <b>Time:</b> ${start.toLocaleTimeString(undefined, {timeStyle: 'short'})} onwards  \n📍 <b>Location:</b> <a href="/venues/${data.event.venue._id}">${data.event.venue.name} (${data.event.venue.city}, ${data.event.venue.country})</a>` + '\n\n' + rest.join('\n\n');
</script>

{#if data.event.banner}
  <BannerContainer img={data.event.banner} alt="{data.event.name} Event Banner" />
{/if}
<PageTitle
  titleVisible={data.event.name}
  descriptionVisible={'<p>' + body.replace(/\r?\n\r?\n(?!<h\d\W)/g, '</p><p>').replace(/\r?\n\r?\n(<h\d[^\w\s>]?)/g, '</p>$1 class="mb-3"').replace(/\s\s\n/g, '<br>') + '</p>'}
  titleClass={data.event.banner ? 'text-white' : ''}
>
  <svelte:fragment slot="actions">
    {#if data.user?.role === 'manager' && data.event.managers.includes(data.user._id)}
      <a href="{$page.url.pathname}/edit" type="button" class="btn btn-secondary" tabindex="0">Edit</a>
    {/if}
  </svelte:fragment>
</PageTitle>

{#if data.user?.role === 'manager' && data.event.managers.includes(data.user._id)}
  <Section title="Participants">
    <table class="table">
      <thead>
        <tr>
          {#each ['#', 'First name', 'Last name', 'E-Mail', 'Ticket'] as column}
            <th scope="col">{column}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data.event.participants as { _id, firstName, lastName, email }, i (_id)}
          <tr>
            <th scope="row">{i + 1}</th>
            {#each [firstName, lastName, email, 'Regular Ticket'] as cell}
              <td>{cell}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </Section>
{:else}
  {#if end > now}
    <Section title="Tickets">
      {#if data.user && data.event.participants.map(p => p._id).includes(data.user._id)}
        <p>You already have a ticket for this event.</p>
      {:else if data.event.participants.length >= data.event.maxParticipants}
        <p>This event is sold out.</p>
      {:else if data.user?.role !== 'guest'}
        <p>You need to be logged in as a guest to buy a ticket!</p>
        <a href="/login?redirect={$page.url.pathname}" class="btn btn-primary">Login</a>
      {:else}
        <div class="list-group mt-3 col-lg-5">
          <a href="{$page.url.pathname}/signup" class="list-group-item d-flex justify-content-between align-items-center shadow">
            <div class="ms-2 me-auto">
              <div class="fw-bold">Regular Ticket</div>
              Get your ticket for the event.
            </div>
            <span class="badge rounded-pill fs-6" class:bg-primary={data.event.price != 0}>
              {#if data.event.price == 0}
                Free
              {:else}
                {@html data.event.price % 1 === 0 ? data.event.price + '.&ndash;' : data.event.price.toFixed(2)}&nbsp;Fr.
              {/if}
            </span>
          </a>
        </div>
      {/if}
    </Section>
  {:else}
    <Section title="Event has ended">
      <p>
        This event has already ended. You can no longer buy tickets for it.
      </p>
    </Section>
  {/if}
{/if}
