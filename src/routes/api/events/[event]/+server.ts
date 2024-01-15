import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ObjectId } from "mongodb";
import { deleteEvent, getEvents, setEvent } from "$lib/server/mongodb";
import { EVENT_KEYS, validateKeys } from "$lib/util/api";

export const GET: RequestHandler = async ({ params, url }) => {
  const expand = url.searchParams.get("expand") || undefined;

  const events = await getEvents(expand, { _id: new ObjectId(params.event) }, 1);
  
  if (events.length === 0)
    throw error(404, "Event not found");

  return json({
    status: "success",
    event: events[0],
  });
};

export const PUT: RequestHandler = async ({ request }) => {
  const data = await request.json();
  validateKeys(data, EVENT_KEYS);

  const events = await getEvents(undefined, { _id: new ObjectId(data._id as string) }, 1);
  if (events.length === 0)
    throw error(404, "Event not found");

  const event = { ...events[0], ...data } as App.DTEvent;
  if (!Array.isArray(event.categories))
    event.categories = (event.categories as string).split(',');

  if (await setEvent(event))
    return json({
      status: "success",
      event
    });

  throw error(500, "Failed to update event");
};

export const DELETE: RequestHandler = async ({ params }) => {
  const events = await getEvents(undefined, { _id: new ObjectId(params.event) }, 1);
  if (events.length === 0)
    throw error(404, "Event not found");

  if (await deleteEvent(params.event))
    return json({
      status: "success",
      event: events[0]
    });
  
  throw error(500, "Failed to delete event");
}
