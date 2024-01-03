import { EVENT_KEYS } from "$lib/util/api";
import { redirect, type Actions } from "@sveltejs/kit";

const getData = async (request: Request) => [
  ...(await request.formData()).entries()
].reduce((acc, [key, value]) => {
  if (EVENT_KEYS.includes(key as keyof App.DTEvent))
    acc[key as keyof App.DTEvent] = value as string | number;
  return acc;
}, {} as Record<keyof App.DTEvent, string | number>);

export const actions = {
	edit: async ({ request, fetch }) => {
		const event = await getData(request);
    const res = await fetch(`/api/events/${event._id}`, {
      method: 'PUT',
      body: JSON.stringify(event)
    });
    const json = await res.json();

    if (json.status === 'success')
      throw redirect(303, `/events/${event._id}`);
	}
} satisfies Actions;
