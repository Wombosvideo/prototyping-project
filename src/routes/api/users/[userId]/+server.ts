import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, fetch }) => {
  const res = await fetch("/api/users");
  const data = await res.json();

  if (data.status !== "success")
    throw error(500, "Failed to fetch users");

  const user = (data.users as App.DTUser[]).find(e => e.id === params.userId)
  return json({
    status: user ? "success" : "error",
    error: user ? undefined : "User not found",
    user,
  });
};
