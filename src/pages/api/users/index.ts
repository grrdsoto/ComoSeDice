import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  // Getting the information from the form.
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const username = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // Checking to make sure no required data is missing. 
  if (!name || !username || !email || !password) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }

  // Constructing the general new user template. Everything will be filled in except for their "name", "username", "email", and password.
  // Every new user will start with bestScore and gamesPlayed as 0 in both game modes - normal and timed. 
  const data = {
    email: email,
    name: name,
    normalGameMode: {
        bestScore: 0,
        gamesPlayed: 0
    },
    password: password,
    signedIn: false,
    timedGameMode: {
        bestScore: 0,
        gamesPlayed: 0
    },
    username: username
  }

  try {
    const db = getFirestore(app);
    // Getting collection "users" from the database.
    const usersRef = db.collection("users");
    // Adding the new user.
    await usersRef.add(data);
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/dashboard");
};