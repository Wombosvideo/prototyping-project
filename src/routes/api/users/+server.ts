import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { users } from "$lib/stores/user";

export const GET: RequestHandler = async () => {
  return json({
    status: "success",
    users,
  });
};
