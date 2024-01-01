import { getVenues } from "$lib/server/mongodb";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({params}) => {
  const venues = await getVenues(params.venue);

  if (venues.length === 0)
    throw error(404, "Venue not found");

  return json({
    status: "success",
    venue: venues[0]
  });
};
