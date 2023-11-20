<script lang="ts">
	import { fade } from "svelte/transition";

  export let image: string | undefined = undefined;
  export let title: string;
  export let body: string;
  export let offText: string;
  export let header: string | boolean = false;
  export let bgColor: "normal" | "primary" | "secondary" = "normal";
</script>

<div
  class="card box-shadow"
  class:bg-primary={bgColor === "primary"}
  transition:fade|local={{duration: 200}}
  >
  {#if image}
    <img class="card-img-top" src={image} alt={title} />
  {/if}
  {#if header}
    <div class="card-header">
      <slot name="header">
        {header}
      </slot>
    </div>
  {/if}
  <div class="card-body">
    <h3 class="card-title fs-4">{title}</h3>
    <p class="card-text">{@html body.replace(/\n/g, '<br>')}</p>
    <div class="d-flex justify-content-between align-items-center">
      <slot name="buttons">
        <div></div>
      </slot>
      <small class="text-muted">{offText}</small>
    </div>
  </div>
</div>
