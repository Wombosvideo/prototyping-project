import { venues as collection } from "$lib/server/mongodb";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({params}) => {
  const venues = (await collection.aggregate([
    { '$match': { _id: params.venue } },
    { '$limit': 1 },
    {
      '$lookup': {
        'from': 'events', 
        'localField': '_id', 
        'foreignField': 'venue', 
        'as': 'events'
      }
    },
    { '$set': { 'eventCount': { '$size': '$events' } } },
    { '$unset': 'events' }
  ]).toArray()).map(e => ({...e, _id: e._id.toString()})) as App.DTVenue[];

  if (venues.length === 0)
    throw error(404, "Venue not found");

  return json({
    status: "success",
    venue: venues[0]
  });
};
