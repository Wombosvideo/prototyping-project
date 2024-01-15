import { VENUE_KEYS } from "$lib/util/api";
import { redirect, type Actions, error } from "@sveltejs/kit";

const getData = async (request: Request) => [
  ...(await request.formData()).entries()
].reduce((acc, [key, value]) => {
  if (VENUE_KEYS.includes(key as keyof App.DTVenue))
    acc[key as keyof App.DTVenue] = value as string | number;
  return acc;
}, {} as Record<keyof App.DTVenue, string | number>);

const createOrUpdate = async (request: Request, fetch: typeof window.fetch, create = true) => {
  const venue = await getData(request);
  const res = await fetch(`/api/venues${create ? '' : `/${venue._id}`}`, {
    method: create ? 'POST' : 'PUT',
    body: JSON.stringify(venue)
  });
  const json = await res.json();

  if (json.status === 'success')
    throw redirect(303, `/venues/${json.venue._id}`);
  else
    throw error(res.status, json.message);
}

export const actions = {
  create: async ({ request, fetch }) => await createOrUpdate(request, fetch),
	edit: async ({ request, fetch }) => await createOrUpdate(request, fetch, false),
} satisfies Actions;
