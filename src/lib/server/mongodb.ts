import { MongoClient, type Document } from "mongodb";
import { MONGODB_URI } from "$env/static/private";

const client = new MongoClient(MONGODB_URI);

export async function connect() {
  await client.connect();
  return client;
}

export async function disconnect() {
  await client.close();
}

const db = client.db();
export default db;

export const events = db.collection("events");
export const users = db.collection("users");
export const categories = db.collection("categories");
export const venues = db.collection("venues");

export const lookup = (field: string, collection = field) => ({
  '$lookup': {
    'from': collection, 
    'localField': field, 
    'foreignField': '_id', 
    'as': field
  }
});
export const unwind = (field: string) => ({
  '$unwind': {
    'path': `$${field}`
  }
});
export const first = (field: string) => ({
  '$first': `$${field}`
});
export const addToSet = (field: string) => ({
  '$addToSet': `$${field}`
});

export const eventAggregate = (expand?: string, match?: Record<string, string | object>) => {
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
          aggregate.push(...[
            lookup(e),
            unwind(e)
          ]);
          group['$group'][e] = addToSet(e);
          break;
        case "managers":
        case "participants":
          aggregate.push(...[
            lookup(e, "users"),
            unwind(e)
          ]);
          group['$group'][e] = addToSet(e);
          break;
        case "venue":
          aggregate.push(...[
            lookup(e, "venues"),
            unwind(e)
          ]);
          group['$group'][e] = { '$first': first(e) };
          break;
      }
    }
    aggregate.push(group);
  }

  return aggregate;
}
