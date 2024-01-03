import { MongoClient, Collection, ObjectId, type WithId, type Document } from "mongodb";
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

export const setEvent = async (event: App.DTEvent) => {
  const { _id, managers, venue, categories, participants, startDateTime, endDateTime, ...rest } = event;
  const obj = {
    startDateTime: new Date(startDateTime),
    endDateTime: new Date(endDateTime),
    managers: managers.map(id => new ObjectId(id)),
    venue: new ObjectId(venue),
    categories: categories.map(id => new ObjectId(id)),
    participants: participants.map(id => new ObjectId(id)),
    ...rest
  }
  const result = await events.updateOne({_id: new ObjectId(_id)}, {$set: obj}); // FIXME: Type error
  return result.modifiedCount === 1;
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
