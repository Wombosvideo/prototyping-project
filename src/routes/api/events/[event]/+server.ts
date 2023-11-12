import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, fetch }) => {
  const res = await fetch("/api/events");
  const data = await res.json();

  if (data.status !== "success")
    throw error(500, "Failed to fetch events");

  const event = (data.events as App.DTEvent[]).find(e => e.id === params.event)
  return json({
    status: event ? "success" : "error",
    error: event ? undefined : "Event not found",
    event,
  });
};
