import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
	const { user } = locals;
  const redirectUrl = url.searchParams.get("redirect");

  if (user)
    throw redirect(302, redirectUrl || "/");

  return {
    redirect: redirectUrl || undefined
  };
};

export const actions = {
  default: async ({ request, cookies, locals, fetch }) => {
    const form = await request.formData();
    const formDataObj = {} as any;
    form.forEach((value, key) => (formDataObj[key] = value));
    const res = await fetch(`/api/users`, { method: "POST", body: JSON.stringify(formDataObj) });
    const data = await res.json();

    if (data.status !== "success")
      return fail(500, { error: "Failed to add user" });

    cookies.set("userId", data.user._id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax'
    });
    locals.user = data.user;

    throw redirect(302, '/');
  }
} satisfies Actions;
