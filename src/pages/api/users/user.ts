// Importing database tools.
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from 'firebase-admin/firestore';

// Initalizing the method that will allow us to get the user.
const auth = getAuth(app);

const db = getFirestore(app);
const usersRef = db.collection("users");

/**
 * Checks the cookie that was created when the user signed in and authenticates it.
 * 
 * @param cookie that was created when the user signed in.
 * @returns user
 */
export async function checkCookieSessionAndGetUser(cookie: any) {
    const decodedCookie = await auth.verifySessionCookie(cookie);
    const user = await auth.getUser(decodedCookie.uid);
    return user; 
}

/**
 * Function that gets the userSnapshot of the user from the "users" collection.
 * 
 * @param user reference that gotten from {@link checkCookieSessionAndGetUser}
 * @returns userSnapshot
 */
export async function getUserSnapshot(user: any) {
    const userSnapshot = await usersRef.doc(user.uid).get();
    return userSnapshot;
}
