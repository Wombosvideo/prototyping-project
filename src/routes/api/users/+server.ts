import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  return json({
    status: "success",
    users: [
      {
        id: "1",
        displayName: "Alice Visconti",
        email: "alice.visconti@example.com",
        firstName: "Alice",
        lastName: "Doe",
        role: "manager"
      },
      {
        id: "2",
        displayName: "Bob Ross",
        email: "bob.ross@example.com",
        firstName: "Bob",
        lastName: "Ross",
        role: "guest"
      }
    ] as App.DTUser[],
  });
};
