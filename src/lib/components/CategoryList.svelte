<script lang="ts">
	import { mdiClose } from "@mdi/js";

	import Icon from "./Icon.svelte";
	import { getCategories } from "$lib/util/api";

  let categories = getCategories().then((categories) => {
    return categories.sort((a, b) => a.name.localeCompare(b.name));
  });

  export let selection: string[];
</script>

{#await categories}
  Loading...
{:then categories}
  <ul class="fs-5">
    {#each categories as category (category._id)}
      <!-- svelte-ignore a11y-invalid-attribute -->
      <li>
        {#if selection.includes(category._id)}
          <span class="badge rounded-pill text-bg-primary">
            <Icon d={category.icon}/>
            {category.name}&nbsp;
            <a class="text-bg-primary" href="#" on:click={() => {
              selection = selection.filter(s => s !== category._id)
            }} tabindex="0">
              <Icon d={mdiClose}/>
            </a>
          </span>
        {:else}
          <a href="#" class="badge rounded-pill text-bg-secondary" on:click|preventDefault={() => {
            selection = [...selection, category._id]
          }} tabindex="0">
            <Icon d={category.icon}/>
            {category.name}
          </a>
        {/if}
      </li>
    {:else}
      <li>
        No categories
      </li>
    {/each}
  </ul>
{/await}

<style>
  ul {
    list-style: none;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 0.5rem;
    padding: 0;
  }
  .badge {
    text-decoration: none;
  }
</style>
