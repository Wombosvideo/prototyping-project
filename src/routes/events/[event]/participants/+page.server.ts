import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { user } = locals;
  
  if (user?.role !== "manager")
    throw error(403, "You must be a manager to see participants");

  const { event, breadcrumbs } = await parent();
  breadcrumbs.push({ href: `/events/${event.id}/participants`, label: "Participants" });

  return {
    event,
    breadcrumbs,
    user
  };
};
