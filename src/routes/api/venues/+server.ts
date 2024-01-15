import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { addVenue, getVenues } from "$lib/server/mongodb";
import { VENUE_KEYS, validateKeys } from "$lib/util/api";

export const GET: RequestHandler = async () => {
  return json({
    status: "success",
    venues: await getVenues()
  });
};

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.user)
    throw error(401, "Unauthorized");
  if (locals.user.role !== 'manager')
    throw error(403, "Forbidden");

  const data = await request.json();
  validateKeys(data, VENUE_KEYS.filter(key => !['_id'].includes(key)));

  const venues = await getVenues(data._id as string);
  if (venues.length !== 0)
    throw error(409, "Venue already exists");

  const venueAdded = await addVenue(data);

  if (venueAdded)
    return json({
      status: "success",
      venue: venueAdded
    });

  throw error(500, "Failed to add venue");
};
