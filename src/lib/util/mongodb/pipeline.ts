import type { Document } from "mongodb";
import { lookup, first } from "$lib/util/mongodb/aggregation";

export const event = (expand?: string, match?: Record<string, string | object>, limit?: number) => {
  const aggregate: Document[] = [];
  
  if (match)
    aggregate.push({ '$match': match });

  if (expand) {
    const expandArray = expand.split(",");
    for (const e of expandArray) {
      switch (e) {
        case "categories":
          aggregate.push(lookup(e));
          break;
        case "managers":
        case "participants":
          aggregate.push(lookup(e, "users"));
          break;
        case "venue":
          aggregate.push(...[ lookup(e, "venues"), {$set: {[e]: first(e)}} ]);
          break;
      }
    }
  }

  if (limit)
    aggregate.push({ '$limit': limit });

  return aggregate;
}
export const venue = (match?: Record<string, string | object>, limit?: number) => {
  const aggregate: Document[] = [];

  if (match)
    aggregate.push({ '$match': match });

  aggregate.push(...[
    {
      '$lookup': {
        'from': 'events', 
        'localField': '_id', 
        'foreignField': 'venue', 
        'as': 'events'
      }
    },
    {
      '$set': {
        'eventCount': { '$size': '$events' },
        'upcomingEventCount': { '$size': {
          '$filter': {
            'input': '$events',
            'as': 'event',
            'cond': { '$gt': ['$$event.endDateTime', new Date()] }
          }
        }}
      }
    },
    { '$unset': 'events' }
  ]);

  if (limit)
    aggregate.push({ '$limit': limit });

  return aggregate;
};
