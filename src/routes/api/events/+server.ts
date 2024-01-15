import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { addEvent, getEvents } from "$lib/server/mongodb";
import { ObjectId } from "mongodb";
import { EVENT_KEYS, validateKeys } from "$lib/util/api";

export const GET: RequestHandler = async ({ url }) => {
  const manager = url.searchParams.get("by");
  const venue = url.searchParams.get("at");
  const expand = url.searchParams.get("expand") || undefined;

  let filter = undefined as Record<string, string | object> | undefined;
  if (manager)
    filter = {...filter || {}, managers: new ObjectId(manager)};
  if (venue)
    filter = {...filter || {}, venue: new ObjectId(venue)};

  return json({
    status: "success",
    events: await getEvents(expand, filter)
  });
};

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user)
    throw error(401, "Unauthorized");
  if (locals.user.role !== 'manager')
    throw error(403, "Forbidden");

  const data = await request.json();
  validateKeys(data, EVENT_KEYS.filter(key => !['_id', 'managers', 'participants'].includes(key)));
  
  const events = await getEvents(undefined, { _id: new ObjectId(data._id as string) }, 1);
  if (events.length !== 0)
    throw error(409, "Event already exists");

  const managers = data.managers as string[] || [];
  if (!managers.includes(locals.user._id))
    managers.push(locals.user._id);
  const event = { managers, participants: [], ...data } as App.DTEvent;

  if (!Array.isArray(event.categories))
    event.categories = (event.categories as string).split(',');

  const eventAdded = await addEvent(event);

  if (eventAdded)
    return json({
      status: "success",
      event: eventAdded
    });

  throw error(500, "Failed to add event");
};
