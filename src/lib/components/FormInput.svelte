<script lang="ts">
	import { getVenues } from "$lib/util/api";
	import datepicker from "$lib/util/datepicker";
	import CategoryList from "./CategoryList.svelte";

  export let type: 'text' | 'textarea' | 'number' | 'datetime' | 'venue' | 'categories' = 'text';
  export let id: string;
  export let label = id.charAt(0).toUpperCase() + id.slice(1);
  export let placeholder = label;
  export let optional: boolean | undefined = undefined;
  export let half: boolean | undefined = undefined;
  export let value: string | number | string[] | undefined = undefined;

  $: valueJoined = Array.isArray(value) ? value.join(',') : value;
</script>

<div class="{half ? 'col col-12 col-md-6 ' : ''}mb-3">
  <label for={id} class="form-label">{label}</label>
  {#if type === 'text'}
    <input type="text" class="form-control" {id} name={id} {placeholder} required={!optional} bind:value />
  {:else if type === 'number'}
    <input type="number" class="form-control" {id} name={id} {placeholder} required={!optional} bind:value />
  {:else if type === 'textarea'}
    <textarea class="form-control" {id} name={id} {placeholder} required={!optional} bind:value rows="6"></textarea>
  {:else if type === 'datetime'}
    <input type="text" class="form-control" {id} name={id} {placeholder} required={!optional} bind:value use:datepicker />
  {:else if type === 'venue'}
    {#await getVenues()}
      <p>Loading venues...</p>
    {:then venues}
      <select class="form-select" id="venue" name="venue" aria-label="Venue" required bind:value>
        <option selected={!value}>Choose...</option>
        {#each venues as { _id, name, city, country } (_id)}
          <option value={_id}>{name} ({city}, {country})</option>
        {/each}
      </select>
    {/await}
  {:else if type === 'categories' && Array.isArray(value)}
    <input type="hidden" {id} name={id} bind:value={valueJoined} />
    <CategoryList bind:selection={value} />
  {:else}
    Unknown input type: {type}
  {/if}
</div>
