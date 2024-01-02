const get = async (api: string, params?: Record<string, string> | undefined) => {
  const paramsStr = params ? Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&') : '';
  return await (await fetch(`/api/${api}${paramsStr ? `?${paramsStr}` : ''}`)).json();
}

export const getCategories = async () => (await get('categories')).categories as App.DTCategory[];

export const getEvents = async (params?: Record<string, string> | undefined, includePastEvents?: boolean, includeUpcomingEvents?: boolean) => {
  const events = await get('events', params) as App.DTEvent[];
  const now = new Date();
  return events.filter((event) => {
    const end = new Date(event.endDateTime);
    return (includePastEvents !== false && end < now) || (includeUpcomingEvents !== false && end > now);
  });
};

export const getUsers = async () => (await get('users')).users as App.DTUser[];

export const getVenues = async () => {
  const venues = await get('venues') as App.DTVenue[];
  return venues.sort((a, b) => {
    if (b.eventCount === a.eventCount) {
      return a.name.localeCompare(b.name);
    }
    return b.eventCount - a.eventCount;
  });
};
