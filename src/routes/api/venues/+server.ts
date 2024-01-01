import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { venues as collection, venueAggregate } from "$lib/server/mongodb";

export const GET: RequestHandler = async () => {
  const venues = (
    await collection.aggregate(
      venueAggregate()
    ).toArray()
  ).map(
    e => ({...e, _id: e._id.toString()})
  ) as App.DTVenue[];
  
  return json({
    status: "success",
    venues
  });
};
