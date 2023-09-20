/**
 * This file will handle all new users that will be created with the form that is in register.astro. It will create a new auth user
 * and link the auth user to an instance in teh "users" collection.
 */

import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  /* Get form data */
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const username = formData.get("username")?.toString();

  // Making sure that there is no missing data coming from the user.
  if (!email || !password || !name ) {
    return new Response(
      "Missing form data",
      { status: 400 }
    );
  }

  try {
    // Create auth user.
    await auth.createUser({
      email,
      password,
      displayName: name,
    /* 
    After the auth user has been created it will be given a uid - this uid will be the 'document id' in the "users" collection, that way we can link the 
    auth user to an instance in the "users" collection.
    */
    }).then((userRecord) => {
      console.log('Succesfully created new user:', userRecord.uid)
      const db = getFirestore(app);
      /* 
      Getting collection "users" from the database. 
      To link the auth user to an instance in the "users" collections, we use the '.doc' method to manually set the 'document id'.
      Since this is a new user, everything is preset - 'bestScore' and 'gamesPlayed' in both "normalGameMode" and "TimedGameMode" will be set to 0.
      */ 
      db.collection("users").doc(userRecord.uid).set({
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
      });
    });
  } catch (error: any) {
    return new Response(
      "Something went wrong",
      { status: 400 }
    );
  }
  return redirect("/signin");
};