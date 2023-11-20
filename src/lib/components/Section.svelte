<script lang="ts">
  export let title: string;
  export let titleClass: string = "";
  export let body: string | undefined = undefined;
  export let kind: "title" | "section" = "section";
</script>

<section>
  <svelte:element this={kind === "title" ? "h1" : "h2"} class="mb-3 {titleClass}">{title}</svelte:element>
  {#if body}
    {@html body}
  {/if}
  <slot />
</section>
