import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  // FIXME: Replace with venues from database
  return json({
    status: "success",
    venues: [
      {
        _id: "1",
        name: "Theatre",
        address: "123 Main St",
        city: "Anytown",
        zip: "12345",
        country: "USA",
      }
    ] as App.DTVenue[],
  });
};
