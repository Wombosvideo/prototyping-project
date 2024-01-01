import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getVenues } from "$lib/server/mongodb";

export const GET: RequestHandler = async () => json({
  status: "success",
  venues: await getVenues()
});
