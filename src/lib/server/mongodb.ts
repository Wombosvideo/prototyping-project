import { MongoClient, type Collection, ObjectId, type WithId, type Document } from "mongodb";
import { MONGODB_URI } from "$env/static/private";
import { event, venue } from "$lib/util/mongodb/pipeline";

type Mongify<T extends {_id: string}, oid extends keyof T = '_id', oidArray extends keyof T = never> = {
  [Key in keyof T]: Key extends oid ? ObjectId : Key extends oidArray ? ObjectId[] : T[Key];
};

const client = new MongoClient(MONGODB_URI);
const unmongify = (e: WithId<Document>) => ({...e, _id: e._id.toString()});

export const connect = async () => await client.connect();
export const disconnect = async () => await client.close();

const db = client.db();
export default db;

export const categories = db.collection("categories") as Collection<Mongify<App.DTCategory>>;
export const events = db.collection("events") as Collection<Mongify<App.DTEvent, '_id' | 'venue', 'categories' | 'managers' | 'participants'>>;
export const users = db.collection("users") as Collection<Mongify<App.DTUser>>;
export const venues = db.collection("venues") as Collection<Mongify<App.DTVenue>>;

export const getCategories = async () => (
  await categories.find({}).toArray()
).map(unmongify) as App.DTCategory[];

export const getEvents = async (expand?: string, match?: Record<string, string | object>, limit?: number) => (
  await events.aggregate(event(expand, match, limit)).toArray() as WithId<Document>[]
).map(unmongify) as App.DTEvent[];

const mongifyEvent = (event: App.DTEvent) => {
  const { _id, managers, venue, categories, participants, startDateTime, endDateTime, ...rest } = event;
  return { _id, obj: {
    startDateTime: new Date(startDateTime),
    endDateTime: new Date(endDateTime),
    managers: managers.map(id => new ObjectId(id)),
    venue: new ObjectId(venue),
    categories: categories.map(id => new ObjectId(id)),
    participants: participants.map(id => new ObjectId(id)),
    ...rest
  }};
}

export const addEvent = async (event: App.DTEvent) => {
  const { obj } = mongifyEvent(event);
  const result = await events.insertOne(obj as any);
  if (result.acknowledged) {
    const event = await getEvents(undefined, {_id: result.insertedId}, 1);
    if (event.length === 1)
      return event[0];
  }
  return undefined;
}

export const setEvent = async (event: App.DTEvent) => {
  const { _id, obj } = mongifyEvent(event);
  const oid = new ObjectId(_id);
  const result = await events.updateOne({_id: oid}, {$set: obj as any});
  if (result.acknowledged) {
    const event = await getEvents(undefined, {_id: oid}, 1);
    if (event.length === 1)
      return event[0];
  }
  return result.modifiedCount === 1;
}

export const deleteEvent = async (objectId: string) => {
  const result = await events.deleteOne({_id: new ObjectId(objectId)});
  return result.deletedCount === 1;
}

export const getUsers = async (objectId?: string) => {
  if (objectId) {
    const user = await users.findOne({_id: new ObjectId(objectId)});
    return user ? [unmongify(user) as App.DTUser] : [];
  } else {
    return (await users.find({}).toArray()).map(unmongify) as App.DTUser[];
  }
};

export const getVenues = async (objectId?: string) => (
  await venues.aggregate(venue(objectId ? {_id: new ObjectId(objectId)} : undefined, objectId ? 1 : undefined)).toArray() as Mongify<App.DTVenue>[]
).map(unmongify) as App.DTVenue[];

export const addVenue = async (venue: App.DTVenue) => {
  const { _id, ...rest } = venue;
  const result = await venues.insertOne(rest as any);
  if (result.acknowledged) {
    const venue = await getVenues(result.insertedId.toString());
    if (venue.length === 1)
      return venue[0];
  }
  return undefined;
}

export const setVenue = async (venue: App.DTVenue) => {
  const { _id, ...rest } = venue;
  const result = await venues.updateOne({_id: new ObjectId(_id)}, {$set: rest});
  return result.modifiedCount === 1;
}

export const deleteVenue = async (objectId: string) => {
  const result = await venues.deleteOne({_id: new ObjectId(objectId)});
  return result.deletedCount === 1;
}
