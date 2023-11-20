import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, parent, url }) => {
	const { user } = locals;
  
  if (!user)
    throw redirect(302, `/login?redirect=${url.pathname}`);

  if (user.role !== "guest")
    throw error(403, "As a manager, you cannot sign up for events.");

  const { event, breadcrumbs } = await parent();
  breadcrumbs.push({ href: `/events/${event.id}/signup`, label: "Sign up" });

  return {
    event,
    breadcrumbs,
    user
  };
};
