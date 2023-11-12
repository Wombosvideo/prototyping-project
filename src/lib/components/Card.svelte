<script lang="ts">
  export let title: string;
  export let body: string;
  export let offText: string;
</script>

<div class="card mb-4 box-shadow">
  <div class="card-body">
    <h3>{title}</h3>
    <p class="card-text">{body}</p>
    <div class="d-flex justify-content-between align-items-center">
      <slot name="buttons">
        <div></div>
      </slot>
      <small class="text-muted">{offText}</small>
    </div>
  </div>
</div>
