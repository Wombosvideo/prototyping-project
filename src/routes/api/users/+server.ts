import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { users } from "$lib/stores/user";
import { get } from "svelte/store";

export const GET: RequestHandler = async () => {
  return json({
    status: "success",
    users: get(users),
  });
};
