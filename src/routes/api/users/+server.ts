import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getUsers } from "$lib/server/mongodb";

export const GET: RequestHandler = async () => json({
  status: "success",
  users: await getUsers()
});
