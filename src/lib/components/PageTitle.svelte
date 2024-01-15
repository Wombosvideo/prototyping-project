<script lang="ts">
  import Section from "$lib/components/Section.svelte";

  export let title: string | undefined = undefined;
  export let titleVisible: string | undefined = undefined;
  export let titleClass: string = "";
  export let description: string | undefined = undefined;
  export let descriptionVisible: string | undefined = undefined;
</script>

<svelte:head>
  <title>{title ?? titleVisible} | Event Manager</title>
  {#if description ?? descriptionVisible}
    <meta name="description" content={description ?? descriptionVisible} />
  {/if}
  <meta property="og:title" content={title ?? titleVisible} />
  <meta property="og:type" content="website" />
  <meta property="og:sitename" content="Event Manager" />
  {#if description ?? descriptionVisible}
    <meta property="og:description" content={description ?? descriptionVisible} />
  {/if}
</svelte:head>

<Section
  title={titleVisible ?? "Page Title"}
  titleClass={titleClass}
  body={descriptionVisible}
  kind="title"
>
  <svelte:fragment slot="title">
    &nbsp;
    <slot name="actions" />
  </svelte:fragment>
  <slot />
</Section>
