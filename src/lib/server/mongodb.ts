import { MongoClient } from "mongodb";
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
