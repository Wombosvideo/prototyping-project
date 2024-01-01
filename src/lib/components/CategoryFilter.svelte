<script lang="ts">
  import CategoryList from './CategoryList.svelte';
  import Section from "./Section.svelte";

  export let selection: string[] = [];
</script>

<Section title="Categories">
  <svelte:fragment slot="title">
    <!-- svelte-ignore a11y-invalid-attribute -->
    {#if selection.length > 0}
      &nbsp;
      <a href="#" class="btn btn-secondary" on:click|preventDefault={() => {
        selection = []
      }}>Clear</a>
    {/if}
  </svelte:fragment>
  <CategoryList {selection}></CategoryList>
</Section>
