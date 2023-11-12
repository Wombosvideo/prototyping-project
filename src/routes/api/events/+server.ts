import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  return json({
    status: "success",
    events: [
      {
        id: "1",
        name: "Event 1",
        description: "Event 1 description",
        startDateTime: "2021-01-01T00:00:00.000Z",
        endDateTime: "2021-01-01T01:00:00.000Z",
        price: 100,
        maxParticipants: 150,
      }
    ] as App.DTEvent[],
  });
};
