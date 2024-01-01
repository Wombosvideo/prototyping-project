import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getCategories } from "$lib/server/mongodb";

export const GET: RequestHandler = async () => json({
  status: "success",
  categories: await getCategories()
});
