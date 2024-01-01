import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ObjectId } from "mongodb";
import { getEvents } from "$lib/server/mongodb";

export const GET: RequestHandler = async ({ params, url }) => {
  const expand = url.searchParams.get("expand") || undefined;

  const events = await getEvents(expand || undefined, { _id: new ObjectId(params.event) }, 1);
  
  if (events.length === 0)
    throw error(404, "Event not found");

  return json({
    status: "success",
    event: events[0],
  });
};
