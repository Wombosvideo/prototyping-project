<script lang="ts">
  export let title: string;
  export let body: string | undefined = undefined;
  export let kind: "title" | "section" = "section";
</script>

<section class="mb-5">
  <svelte:element this={kind === "title" ? "h1" : "h2"} class="mb-3">{title}</svelte:element>
  {#if body}
    <p>{body}</p>
  {/if}
  <slot />
</section>
