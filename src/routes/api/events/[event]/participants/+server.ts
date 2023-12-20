import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ObjectId } from "mongodb";
import { events as collection } from "$lib/server/mongodb";

export const GET: RequestHandler = async ({ params }) => {
  const eventDoc = await collection.findOne({ _id: new ObjectId(params.event) }); // FIXME: Aggregate to get participants
  
  if (!eventDoc)
    throw error(404, "Event not found");

  const event = {...eventDoc, _id: eventDoc._id.toString()};

  return json({
    status: "success",
    event,
  });
};
