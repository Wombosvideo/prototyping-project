import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { addUser, getUsers } from "$lib/server/mongodb";
import { USER_KEYS, validateKeys } from "$lib/util/api";

export const GET: RequestHandler = async () => json({
  status: "success",
  users: await getUsers()
});

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  validateKeys(data, USER_KEYS.filter(key => !['_id', 'role'].includes(key)));

  const user = { role: 'guest', ...data } as App.DTUser;
  const userAdded = await addUser(user);

  if (userAdded)
    return json({
      status: "success",
      user: userAdded
    });

  throw error(500, "Failed to add user");
};
