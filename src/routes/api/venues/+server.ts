import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  return json({
    status: "success",
    venues: [
      {
        id: "1",
        name: "Theatre",
        address: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA",
      }
    ] as App.DTVenue[],
  });
};
