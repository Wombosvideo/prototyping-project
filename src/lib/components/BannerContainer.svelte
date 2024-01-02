<script lang="ts">
  export let img: string;
  export let alt: string;
</script>

<div class="banner-container">
  <img src={img} class="banner" {alt} />
</div>

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
