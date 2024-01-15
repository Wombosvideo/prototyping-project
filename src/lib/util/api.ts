import { error } from "@sveltejs/kit";

export const EVENT_KEYS: (keyof App.DTEvent)[] = [
  '_id', 'name', 'description', 'startDateTime', 'endDateTime', 'banner', 'venue', 'price', 'managers', 'participants', 'maxParticipants', 'categories',
];

export const USER_KEYS: (keyof App.DTUser)[] = [
  '_id', 'firstName', 'lastName', 'displayName', 'email', 'role'
];

export const VENUE_KEYS: (keyof App.DTVenue)[] = [
  '_id', 'name', 'address', 'zip', 'city', 'country', 'photo'
];

export const validateKeys = <T>(data: Record<string, unknown>, keys: (keyof T)[]) => {
  if (!data)
    throw error(400, "Invalid request body");
  const dataKeys = Object.keys(data);
  if (dataKeys.some(key => !keys.includes(key as keyof T)))
    throw error(400, `Invalid request body keys. Valid keys are: ${keys.join(", ")}`);
  if (keys.some(key => !dataKeys.includes(key as string)))
    throw error(400, `Missing request body keys. Required keys are: ${keys.join(", ")}`);
}

const get = async (api: string, params?: Record<string, string> | undefined) => {
  const paramsStr = params ? Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&') : '';
  const res = await fetch(`/api/${api}${paramsStr ? `?${paramsStr}` : ''}`);
  const json = await res.json();
  return json[api];
}

export const getCategories = async () => (await get('categories')) as App.DTCategory[];

export const getEvents = async (params?: Record<string, string> | undefined, includePastEvents?: boolean, includeUpcomingEvents?: boolean) => {
  const events = await get('events', params) as App.DTEvent[];
  const now = new Date();
  return events.filter((event) => {
    const end = new Date(event.endDateTime);
    return (includePastEvents !== false && end < now) || (includeUpcomingEvents !== false && end > now);
  });
};

export const getUsers = async () => (await get('users')) as App.DTUser[];

export const getVenues = async () => {
  const venues = await get('venues') as App.DTVenue[];
  return venues.sort((a, b) => {
    if (b.eventCount === a.eventCount) {
      return a.name.localeCompare(b.name);
    }
    return b.eventCount - a.eventCount;
  });
};
