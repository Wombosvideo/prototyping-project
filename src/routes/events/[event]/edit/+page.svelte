<script lang="ts">
  import type { PageData } from './$types';
	import PageTitle from '$lib/components/PageTitle.svelte';
  import CategoryList from '$lib/components/CategoryList.svelte';
	import { enhance } from '$app/forms';
	import Icon from '$lib/components/Icon.svelte';
	import { mdiAccountGroup,  mdiClockEnd, mdiClockStart, mdiCurrencyUsd, mdiFormatText, mdiImage, mdiText } from '@mdi/js';
	import { getVenues } from '$lib/util/api';
	
	export let data: PageData;

  let name = data.event.name;
  let description = data.event.description;
  let startDateTime = data.event.startDateTime;
  let endDateTime = data.event.endDateTime;
  let banner = data.event.banner;
  let venue = data.event.venue;
  let price = data.event.price;
  let maxParticipants = data.event.maxParticipants;
  let categories = data.event.categories;
</script>

<PageTitle
  titleVisible="{data.event.name} - Edit"
  description="Edit the event {data.event.name}."
>
  <form class="mt-5" method="POST" use:enhance>
    <div class="input-group mb-1">
      <span class="input-group-text">
        <Icon d={mdiFormatText} />
      </span>
      <input type="text" class="form-control" name="name" placeholder="Title" aria-label="Title" required bind:value={name}>
    </div>
    <div class="input-group mb-1">
      <span class="input-group-text">
        <Icon d={mdiText} />
      </span>
      <textarea class="form-control" name="description" aria-label="Description" required bind:value={description}></textarea>
    </div>
    <div class="input-group mb-1">
      <span class="input-group-text"><Icon d={mdiClockStart} /></span>
      <input type="text" class="form-control" name="startDateTime" placeholder="Start Date & Time" aria-label="Start Date and Time" required bind:value={startDateTime}>
      <span class="input-group-text"><Icon d={mdiClockEnd} /></span>
      <input type="text" class="form-control" name="endDateTime" placeholder="End Date & Time" aria-label="End Date and Time" required bind:value={endDateTime}>
    </div>
    <div class="input-group mb-1">
      <span class="input-group-text">
        <Icon d={mdiImage} />
      </span>
      <input type="text" class="form-control" name="banner" placeholder="Banner Image URL" aria-label="Banner Image URL" required bind:value={banner}>
    </div>
    <div class="input-group mb-1">
      <label class="input-group-text" for="venue">Venue</label>
      {#await getVenues()}
        <p>Loading...</p>
      {:then venues}
        <select class="form-select" id="venue" name="venue" required bind:value={venue}>
          <option selected={!venue}>Choose...</option>
          {#each venues as { _id, name, city, country } (_id)}
            <option value={_id}>{name} ({city}, {country})</option>
          {/each}
        </select>
      {/await}
    </div>
    <div class="input-group mb-1">
      <span class="input-group-text">
        <Icon d={mdiCurrencyUsd} />
      </span>
      <input type="number" class="form-control" name="price" placeholder="Price" aria-label="Price" required bind:value={price}>
    </div>
    <div class="input-group mb-1">
      <span class="input-group-text">
        <Icon d={mdiAccountGroup} />
      </span>
      <input type="number" class="form-control" name="maxParticipants" placeholder="Max Participants" aria-label="Max Participants" required bind:value={maxParticipants}>
    </div>
    <div class="input-group mb-1">
      <CategoryList bind:selection={categories}></CategoryList>
    </div>
    <input type="submit" class="btn btn-primary mt-3" value="Save Changes">
  </form>
</PageTitle>
