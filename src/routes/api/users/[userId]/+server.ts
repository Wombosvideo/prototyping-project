import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ObjectId } from "mongodb";
import { users as collection } from "$lib/server/mongodb";

export const GET: RequestHandler = async ({ params }) => {
  const userDoc = await collection.findOne({ _id: new ObjectId(params.userId) });
  
  if (!userDoc)
    throw error(404, "User not found");

  const user = {...userDoc, _id: userDoc._id.toString()};

  return json({
    status: "success",
    user,
  });
};
