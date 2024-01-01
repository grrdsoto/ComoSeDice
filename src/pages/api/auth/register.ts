/**
 * Endpoint that will handle all new users that will be created with the form that is in register.astro. It will create a new auth user
 * and link the auth user to an instance in teh "users" collection.
 */
import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  let body = await request.json();

  let email = body.email;
  let password = body.password;
  let name = body.name;
  let username = body.username;
  let profilePictureUrl = body.profilePicture;

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
        timedGameMode: {
          bestScore: 0,
          gamesPlayed: 0
        },
        username: username,
        profilePicture: profilePictureUrl
      });
    });
  } catch (error: any) {
    let message = "";

    if (error.code == "auth/email-already-exists") {
      message = "This email is already being used."
    }

    return new Response(
      "Something went wrong " + error,
      { status: 400, statusText: message }
    );
  }
  return redirect("/signin");
};