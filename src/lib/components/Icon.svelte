<script lang="ts">
  export let d: string;
  export let alt: string | undefined = undefined;
</script>

<svg class="icon" viewBox="0 0 24 24" aria-hidden={alt ? "true" : undefined} role={alt ? "img" : undefined}>
  {#if alt}
    <title>{alt}</title>
  {/if}
  <path {d} />
</svg>

<style>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.125em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
