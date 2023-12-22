import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ObjectId } from "mongodb";
import { events as collection } from "$lib/server/mongodb";

export const GET: RequestHandler = async ({ params }) => {
  const managersDocs = collection.aggregate([
    { '$match': { '_id': new ObjectId(params.event) } },
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'managers', 
        'foreignField': '_id', 
        'as': 'managers'
      }
    },
    {
      '$unwind': {
        'path': '$managers'
      }
    },
    {
      '$project': {
        '_id': '$managers._id', 
        'displayName': '$managers.displayName', 
        'email': '$managers.email', 
        'firstName': '$managers.firstName', 
        'lastName': '$managers.lastName'
      }
    }
  ]);

  if (!managersDocs)
    throw error(404, "Event or managers not found");

  const managers = (await managersDocs.toArray()).map(d => ({...d, _id: d._id.toString()}));

  return json({
    status: "success",
    "_id": params.event,
    managers,
  });
};
