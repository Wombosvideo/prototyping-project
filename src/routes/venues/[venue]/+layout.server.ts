import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, fetch, locals }) => {
  const { user } = locals;

  const res = await fetch(`/api/venues/${params.venue}`);
  const data = await res.json();

  if (data.status !== "success") {
    if (data.message === "Venue not found")
      throw error(404, data.message);
    throw error(500, data.message || "Failed to fetch venue");
  }

	return {
		venue: data.venue as App.DTVenue,
    breadcrumbs: [{ href: `/venues/${data.venue._id.toString()}`, label: data.venue.name }],
    user
	};
};
