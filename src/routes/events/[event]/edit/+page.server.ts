import { user as userStore } from '$lib/stores/user';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const user = get(userStore);
  
  if (user?.role !== "manager")
    throw error(403, "You must be a manager to edit events");

  const res = await fetch(`/api/events/${params.event}`);
  const data = await res.json();

  if (data.status !== "success")
    throw error(500, data.error || "Failed to fetch event");

  return {
    event: data.event as App.DTEvent,
    breadcrumbs: [
      { href: `/events/${data.event.id}`, label: data.event.name },
      { href: `/events/${data.event.id}/edit`, label: "Edit" },
    ],
  };
};
