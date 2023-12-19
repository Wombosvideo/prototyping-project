import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, fetch, locals }) => {
  const { user } = locals;

  const res = await fetch(`/api/events/${params.event}`);
  const data = await res.json();

  if (data.status !== "success")
    throw error(500, data.error || "Failed to fetch event");

	return {
		event: data.event as App.DTEvent,
    breadcrumbs: [{ href: `/events/${data.event._id.toString()}`, label: data.event.name }],
    user
	};
};
