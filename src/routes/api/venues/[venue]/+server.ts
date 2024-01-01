import { venues as collection, venueAggregate } from "$lib/server/mongodb";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ObjectId } from "mongodb";

export const GET: RequestHandler = async ({params}) => {
  const venues = (
    await collection.aggregate(
      venueAggregate({ _id: new ObjectId(params.venue) }, 1)
    ).toArray()
  ).map(
    e => ({...e, _id: e._id.toString()})
  ) as App.DTVenue[];

  if (venues.length === 0)
    throw error(404, "Venue not found");

  return json({
    status: "success",
    venue: venues[0]
  });
};
