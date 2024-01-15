import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, parent, url }) => {
	const { user } = locals;
  
  if (!user)
    throw redirect(302, `/login?redirect=${url.pathname}`);

  if (user.role !== "manager")
    throw error(403, "As a guest, you cannot sign up for events.");

  return {
    user
  };
};
