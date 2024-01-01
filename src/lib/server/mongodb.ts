import { MongoClient, Collection, ObjectId } from "mongodb";
import { MONGODB_URI } from "$env/static/private";
import { event, venue } from "$lib/util/mongodb/pipeline";

type Mongify<T> = Omit<T, '_id'> & {_id: ObjectId};

const client = new MongoClient(MONGODB_URI);
const unmongify = <T>(e: Mongify<T>) => ({...e, _id: e._id.toString()});

export const connect = async () => await client.connect();
export const disconnect = async () => await client.close();

const db = client.db();
export default db;

export const events = db.collection("events") as Collection<Mongify<App.DTEvent>>;
export const users = db.collection("users") as Collection<Mongify<App.DTUser>>;
export const categories = db.collection("categories") as Collection<Mongify<App.DTCategory>>;
export const venues = db.collection("venues") as Collection<Mongify<App.DTVenue>>;

export const getEvents = async (expand?: string, match?: Record<string, string | object>, limit?: number) => (
  await events.aggregate(event(expand, match, limit)).toArray() as Mongify<App.DTEvent>[]
).map(unmongify) as App.DTEvent[];

export const getUsers = async () => (
  await users.find({}).toArray()
).map(unmongify) as App.DTUser[];

export const getCategories = async () => (
  await categories.find({}).toArray()
).map(unmongify) as App.DTCategory[];

export const getVenues = async (objectId?: string) => (
  await venues.aggregate(objectId ? venue({_id: new ObjectId(objectId)}, 1) : venue()).toArray() as Mongify<App.DTVenue>[]
).map(unmongify) as App.DTVenue[];
