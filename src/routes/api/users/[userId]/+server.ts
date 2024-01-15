import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getUsers } from "$lib/server/mongodb";

export const GET: RequestHandler = async ({ params }) => {
  const users = await getUsers(params.userId);
  
  if (users.length === 0)
    throw error(404, "User not found");

  return json({
    status: "success",
    user: users[0],
  });
};
