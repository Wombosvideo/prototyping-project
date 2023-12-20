import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, fetch }) => {
  // FIXME: Replace with venues from database
  const res = await fetch("/api/venues");
  const data = await res.json();

  if (data.status !== "success")
    throw error(500, "Failed to fetch venues");

  const venue = (data.venues as App.DTEvent[]).find(e => e._id.toString() === params.venue)
  return json({
    status: venue ? "success" : "error",
    error: venue ? undefined : "Venue not found",
    venue,
  });
};
