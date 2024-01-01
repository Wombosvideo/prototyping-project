import type { Document } from "mongodb";
import { lookup, unwind, first, addToSet } from "$lib/util/mongodb/aggregation";

export const event = (expand?: string, match?: Record<string, string | object>, limit?: number) => {
  const aggregate: Document[] = [];
  
  if (match)
    aggregate.push({ '$match': match });

  if (expand) {
    const expandArray = expand.split(",");
    const group = {
      '$group': {
        '_id': '$_id', 
        'name': first('name'),
        'description': first('description'),
        'startDateTime': first('startDateTime'),
        'endDateTime': first('endDateTime'),
        'price': first('price'),
        'maxParticipants': first('maxParticipants'),
        'banner': first('banner'),
        'managers': first('managers'),
        'venue': first('venue'),
        'categories': first('categories'),
        'participants': first('participants'),
      } as Record<keyof App.DTEvent, string | object>,
    };

    for (const e of expandArray) {
      switch (e) {
        case "categories":
          aggregate.push(...[ lookup(e), unwind(e) ]);
          group['$group'][e] = addToSet(e);
          break;
        case "managers":
        case "participants":
          aggregate.push(...[ lookup(e, "users"), unwind(e) ]);
          group['$group'][e] = addToSet(e);
          break;
        case "venue":
          aggregate.push(...[ lookup(e, "venues"), unwind(e) ]);
          group['$group'][e] = { '$first': first(e) };
          break;
      }
    }
    aggregate.push(group);
  }

  if (limit)
    aggregate.push({ '$limit': limit });

  return aggregate;
},
venue = (match?: Record<string, string | object>, limit?: number) => {
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
    { '$set': { 'eventCount': { '$size': '$events' } } },
    { '$unset': 'events' }
  ]);

  if (limit)
    aggregate.push({ '$limit': limit });

  return aggregate;
};
