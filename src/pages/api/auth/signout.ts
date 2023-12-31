/**
 * Endpoint that will handle the signout logic.
 */

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete("session", {
    path: "/",
  });
  return redirect("/signin");
};