import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { user } = locals;
  
  if (user?.role !== "manager")
    throw error(403, "You must be a manager to edit venues");

  const { venue, breadcrumbs } = await parent();
  breadcrumbs.push({ href: `/venues/${venue._id.toString()}/edit`, label: "Edit" });

  return {
    venue,
    breadcrumbs,
    user
  };
};
