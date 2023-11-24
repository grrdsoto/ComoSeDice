/**
 * This file will help us edit users logic to be implemented when the 
 * game mode pages are done.
 */

import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const usersRef = db.collection("users");

export const POST: APIRoute = async ({ params, redirect, request }) => {

    console.log("we're in the post method");

    // let userID:string = params.id! !== undefined ? params.id :'';
    console.log("Params: " + params.id)
    // console.log("userID: " + userID);


    let body = request.body;
    console.log("Body: " + body);
    

    try {
        const userID:string = params.id! !== undefined ? params.id :'';
        console.log(userID)

        console.log("In the update score function")
        await usersRef.doc(userID).update({
            body
        })
        console.log("After the updated function")
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        })
    }


  return redirect("/singleplayer");
};