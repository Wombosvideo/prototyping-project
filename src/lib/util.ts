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
