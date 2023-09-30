// Importing database tools.
import { app } from "../../../firebase/server";
import { getFirestore } from 'firebase-admin/firestore';
import type { userModel } from "../interfaces/user";

const db = getFirestore(app);
const usersRef = db.collection("users");

/**
 * Gets the X best scores of the timed game mode.
 * 
 * @returns array of users with best scores.
 */
export async function getXBestTimedScores() {
    /*
    * Query to get x amount of users (done by the .limit(x) method) from the "users" collection sorted in
    * descending order (default value) of 'timedGameMode.bestScore'. 
    * This means that the array will have the following structure:
    * 
    * index 0 -> rank #1 best score
    * index 1 -> rank #2 best score
    * etc.
    */
    const firstThreeRes = await usersRef.orderBy('timedGameMode.bestScore', 'desc').limit(5).get();

    // Creation of array that will be used to store the top x users and then stored in userArray.
    const userArray: userModel[] = [];
    firstThreeRes.forEach(doc => {
        userArray.push(doc.data() as userModel)
    })

    return userArray;
}
