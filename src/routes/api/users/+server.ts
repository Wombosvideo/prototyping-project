import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  return json({
    status: "success",
    users: [
      {
        id: "1",
        displayName: "Alice Doe",
        email: "alice.doe@example.com",
        firstName: "Alice",
        lastName: "Doe",
        role: "manager"
      },
      {
        id: "2",
        displayName: "Bob Doe",
        email: "bob.doe@example.com",
        firstName: "Bob",
        lastName: "Doe",
        role: "guest"
      }
    ] as App.DTUser[],
  });
};
