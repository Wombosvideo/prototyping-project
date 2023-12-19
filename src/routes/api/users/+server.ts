import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { users as collection } from "$lib/server/mongodb";

export const GET: RequestHandler = async () => {
  const users = (await collection.find({}).toArray()).map(e => ({...e, _id: e._id.toString()}));

  return json({
    status: "success",
    users,
  });
};
