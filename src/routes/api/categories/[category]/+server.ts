import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, fetch }) => {
  const res = await fetch("/api/categories");
  const data = await res.json();

  if (data.status !== "success")
    throw error(500, "Failed to fetch categories");

  const category = (data.categories as App.DTCategory[]).find(e => e._id.toString() === params.category)
  return json({
    status: category ? "success" : "error",
    error: category ? undefined : "Category not found",
    category,
  });
};
