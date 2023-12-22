import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { ObjectId } from "mongodb";
import { events as collection } from "$lib/server/mongodb";

export const GET: RequestHandler = async ({ params }) => {
  const participantsDocs = collection.aggregate([
    { '$match': { '_id': new ObjectId(params.event) } },
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'participants', 
        'foreignField': '_id', 
        'as': 'participants'
      }
    },
    {
      '$unwind': {
        'path': '$participants'
      }
    },
    {
      '$project': {
        '_id': '$participants._id', 
        'displayName': '$participants.displayName', 
        'email': '$participants.email', 
        'firstName': '$participants.firstName', 
        'lastName': '$participants.lastName'
      }
    }
  ]);

  if (!participantsDocs)
    throw error(404, "Event or participants not found");

  const participants = (await participantsDocs.toArray()).map(d => ({...d, _id: d._id.toString()}));

  return json({
    status: "success",
    "_id": params.event,
    participants,
  });
};
