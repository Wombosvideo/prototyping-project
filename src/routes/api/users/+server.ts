import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getUsers } from "$lib/server/mongodb";

export const GET: RequestHandler = async () => json({
  status: "success",
  users: await getUsers()
});

export const POST: RequestHandler = async ({ request }) => {
  const user = await request.json();
  return json({
    status: "success",
    user: "TODO"
  });
};
