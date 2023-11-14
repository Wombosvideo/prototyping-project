import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { user } = locals;
  
  if (!user?.role)
    throw error(403, "You must be a logged in to see participants");

  const { event, breadcrumbs } = await parent();
  breadcrumbs.push({ href: `/events/${event.id}/signup`, label: "Sign up" });

  return {
    event,
    breadcrumbs,
    user
  };
};
