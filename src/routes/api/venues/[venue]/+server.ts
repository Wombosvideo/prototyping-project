import { deleteVenue, getVenues, setVenue } from "$lib/server/mongodb";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { VENUE_KEYS, validateKeys } from "$lib/util/api";

export const GET: RequestHandler = async ({params}) => {
  const venues = await getVenues(params.venue);

  if (venues.length === 0)
    throw error(404, "Venue not found");

  return json({
    status: "success",
    venue: venues[0]
  });
};

export const PUT: RequestHandler = async ({ request, params }) => {
  const data = await request.json();
  validateKeys(data, VENUE_KEYS);

  const venues = await getVenues(params.venue);
  if (venues.length === 0)
    throw error(404, "Venues not found");

  const venue = { ...venues[0], ...data } as App.DTVenue;

  if (await setVenue(data as App.DTVenue))
    return json({
      status: "success",
      venue
    });

  throw error(500, "Internal server error");
};

export const DELETE: RequestHandler = async ({ params }) => {
  const venues = await getVenues(params.venue);
  if (venues.length === 0)
    throw error(404, "Venue not found");
  
  if (await deleteVenue(params.venue))
    return json({
      status: "success",
      venue: venues[0]
    });

  throw error(500, "Failed to delete venue");
}
