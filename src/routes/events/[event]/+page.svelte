<script lang="ts">
  import type { PageData } from './$types';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Section from '$lib/components/Section.svelte';
	import { page } from '$app/stores';
	
	export let data: PageData;

  $: end = new Date(data.event.endDateTime);
  $: now = new Date();
</script>

{#if data.event.banner}
  <div class="banner-container">
    <img src={data.event.banner} class="banner" alt="Banner" />
  </div>
{/if}
<PageTitle
  titleVisible={data.event.name}
  descriptionVisible={'<p>' + data.event.description.replace(/\n\n(?!<h\d\W)/g, '</p><p>').replace(/\n\n(<h\d[^\w\s>]?)/g, '</p>$1 class="mb-3"').replace(/\s\s\n/g, '<br>') + '</p>'}
  titleClass={data.event.banner ? 'text-white' : ''}
>
  <svelte:fragment slot="actions">
    {#if data.user?.role === 'manager'}
      <a href="{$page.url.pathname}/edit" type="button" class="btn btn-secondary">Edit</a>
    {/if}
  </svelte:fragment>
</PageTitle>

{#if data.user?.role === 'manager'}
  <Section title="Participants">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First name</th>
          <th scope="col">Last name</th>
          <th scope="col">E-Mail</th>
          <th scope="col">Ticket</th>
        </tr>
      </thead>
      <tbody>
        {#each data.event.participants as { _id, firstName, lastName, email }, i (_id)}
          <tr>
            <th scope="row">{i + 1}</th>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>Regular Ticket</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Section>
{:else}
  {#if end > now}
    <Section title="Tickets">
      {#if data.user?.role !== 'guest'}
        <p>You need to be logged in to buy a ticket!</p>
        <a href="/login?redirect={$page.url.pathname}" class="btn btn-primary">Login</a>
      {/if}
      <div class="list-group mt-3 col-lg-5">
        <svelte:element
          this={data.user?.role === 'guest' ? 'a' : 'div'}
          href="{$page.url.pathname}/signup"
          class="list-group-item d-flex justify-content-between align-items-center"
          class:shadow={data.user?.role === 'guest'}>
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
        </svelte:element>
      </div>
    </Section>
  {:else}
    <Section title="Event has ended">
      <p>
        This event has already ended. You can no longer buy tickets for it.
      </p>
    </Section>
  {/if}
{/if}

<style>
  .banner-container {
    width: calc(100% + 2rem);
    height: 300px;
    overflow: hidden;
    margin-left: -1rem;
    margin-bottom: -6.5rem;
    position: relative;
    z-index: -1;
    border-radius: var(--bs-border-radius-lg);
  }
  .banner-container::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--lb-overlay-gradient);
    z-index: 1;
  }
  .banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 30%;
  }
</style>
