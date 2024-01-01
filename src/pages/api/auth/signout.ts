/**
 * Endpoint that will handle the signout logic.
 */
export const prerender = true;
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete("session", {
    path: "/",
  });
  return redirect("/signin");
};