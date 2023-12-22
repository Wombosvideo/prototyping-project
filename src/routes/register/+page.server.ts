import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
	const { user } = locals;
  const redirectUrl = url.searchParams.get("redirect");

  if (user)
    throw redirect(302, redirectUrl || "/");

  return {
    redirect: redirectUrl || undefined
  };
};
