import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ObjectId } from "mongodb";
import { events as collection, eventAggregate } from "$lib/server/mongodb";

export const GET: RequestHandler = async ({ params, url }) => {
  const expand = url.searchParams.get("expand");

  const aggregate = eventAggregate(expand || undefined, { _id: new ObjectId(params.event) });
  aggregate.push({ '$limit': 1 });
  const events = (await collection.aggregate(aggregate).toArray()).map(e => ({...e, _id: e._id.toString()})) as App.DTEvent[];
  
  if (events.length === 0)
    throw error(404, "Event not found");

  return json({
    status: "success",
    event: events[0],
  });
};
