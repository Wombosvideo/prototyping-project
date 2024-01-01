import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { categories as collection } from "$lib/server/mongodb";

export const GET: RequestHandler = async () => {
  const categories = (
    await collection.find({}).toArray()
  ).map(
    e => ({...e, _id: e._id.toString()})
  ) as App.DTCategory[];
  
  return json({
    status: "success",
    categories
  });
};
