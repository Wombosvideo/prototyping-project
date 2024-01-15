import { getEvents } from '$lib/util/api';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, parent, url }) => {
	const { user } = locals;
  
  if (!user)
    throw redirect(302, `/login?redirect=${url.pathname}`);

  if (user.role !== "guest")
    throw error(403, "As a manager, you cannot sign up for events.");

  const { event, breadcrumbs } = await parent();
  breadcrumbs.push({ href: `/events/${event._id.toString()}/signup`, label: "Sign up" });

  return {
    event,
    breadcrumbs,
    user
  };
};

export const actions = {
  default: async ({ request, fetch, params }) => {
    const data = await request.formData();

    const eventRes = await fetch(`/api/events/${params.event}`);
    const eventData = await eventRes.json();

    if (eventData.status !== 'success')
      throw error(eventRes.status, eventData.message);

    const event = eventData.event as App.DTEvent;
    event.participants.push(data.get('user') as string);

    const res = await fetch(`/api/events/${params.event}`, {
      method: 'PUT',
      body: JSON.stringify(event)
    });
    const json = await res.json();

    if (json.status === 'success')
      throw redirect(303, `/events/${json.event._id}`);
    else
      throw error(res.status, json.message);
  }
};
