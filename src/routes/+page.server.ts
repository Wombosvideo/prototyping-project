import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
	login: async ({ request, cookies, locals, fetch }) => {
    const form = await request.formData();
    const userId = form.get("userid") as string | null;
    const redirectUrl = form.get("redirect") as string | null;
    
    if (!userId)
      return fail(400, { error: "Missing user ID" });
    
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();

    if (data.status !== "success")
      return fail(500, { error: "Failed to fetch user" });

    cookies.set("userId", userId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax'
    });
    locals.user = data.user;

    if (redirectUrl)
      throw redirect(302, redirectUrl);

    return {
      success: true
    }
	},
	logout: async ({ cookies, locals }) => {
    cookies.delete("userId", {
      path: '/',
      sameSite: 'lax'
    });
    locals.user = undefined;

    return {
      success: true
    }
	}
} satisfies Actions;
