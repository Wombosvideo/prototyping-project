import { EVENT_KEYS } from "$lib/util/api";
import { redirect, type Actions, error } from "@sveltejs/kit";

const getData = async (request: Request) => [
  ...(await request.formData()).entries()
].reduce((acc, [key, value]) => {
  if (EVENT_KEYS.includes(key as keyof App.DTEvent))
    acc[key as keyof App.DTEvent] = value as string | number;
  return acc;
}, {} as Record<keyof App.DTEvent, string | number>);

const createOrUpdate = async (request: Request, fetch: typeof window.fetch, create = true) => {
  const event = await getData(request);
  const res = await fetch(`/api/events${create ? '' : `/${event._id}`}`, {
    method: create ? 'POST' : 'PUT',
    body: JSON.stringify(event),
    credentials: 'include'
  });
  const json = await res.json();

  if (json.status === 'success')
    throw redirect(303, `/events/${json.event._id}`);
  else
    throw error(res.status, json.message);
}

export const actions = {
  create: async ({ request, fetch }) => await createOrUpdate(request, fetch),
	edit: async ({ request, fetch }) => await createOrUpdate(request, fetch, false),
  delete: async ({ request, fetch }) => {
    const event = await getData(request);
    const res = await fetch(`/api/events/${event._id}`, { method: 'DELETE' });
    const json = await res.json();

    if (json.status === 'success')
      throw redirect(303, '/events');
    else
      throw error(res.status, json.message);
  }
} satisfies Actions;
