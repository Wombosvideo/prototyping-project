export const getEvents = async (params?: Record<string, string> | undefined, includePastEvents?: boolean, includeUpcomingEvents?: boolean) => {
  const paramsStr = params ? Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&') : '';
  const res = await fetch('/api/events' + (paramsStr ? '?' + paramsStr : ''));
  const json = await res.json();
  const events = json.events as App.DTEvent[];
  const now = new Date();
  return events.filter((event) => {
    const end = new Date(event.endDateTime);
    return (includePastEvents !== false && end < now) || (includeUpcomingEvents !== false && end > now);
  });
};

export const getVenues = async () => {
  const res = await fetch('/api/venues');
  const json = await res.json();
  const venues = json.venues as App.DTVenue[];
  return venues.sort((a, b) => {
    if (b.eventCount === a.eventCount) {
      return a.name.localeCompare(b.name);
    }
    return b.eventCount - a.eventCount;
  });
};
