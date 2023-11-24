/**
 * Endpoint is a dynamic endpoint which has the path of 'id'. 'id' is then used in order
 * for us to get the correct user in order to update their high score if required. 
 */

import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const usersRef = db.collection("users");

export const POST: APIRoute = async ({ params, redirect, request }) => {

    /* 
    We're getting the request json in order to be able to pass it to through the 'update' method
    that firebase database offers.
    */ 
    let body = await request.json();

    const userID:string = params.id! !== undefined ? params.id :'';

    // Updating the record 'normalGameMode' with the new high score.
    await usersRef.doc(userID).update({
        normalGameMode: body
    })

  return redirect("/singleplayer");
};
