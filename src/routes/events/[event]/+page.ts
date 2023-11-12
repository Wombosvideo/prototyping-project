import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const res = await fetch(`/api/events/${params.event}`);
  const data = await res.json();

  if (data.status !== "success")
    throw error(500, data.error || "Failed to fetch event");

	return {
		event: data.event as App.DTEvent,
	};
};
