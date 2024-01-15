import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, fetch, locals }) => {
  const { user } = locals;

  const res = await fetch(`/api/events/${params.event}?expand=participants,venue`);
  const data = await res.json();

  if (data.status !== "success")
    throw error(res.status || 500, data.message || "Failed to fetch event");

	return {
		event: data.event as App.DTEvent & { participants: App.DTUser[] },
    breadcrumbs: [{ href: `/events/${data.event._id.toString()}`, label: data.event.name }],
    user
	};
};
