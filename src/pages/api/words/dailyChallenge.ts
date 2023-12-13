import listWords from "../words";

// Importing database tools.
import { app } from "../../../firebase/server";
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore(app);

const dailyRef = db.collection("daily");

/**
 * Generates 10 random numbers to use when we do the daily challenge. This method should be called chronologically
 * i.e. every 24 hours (ex: every night at 12am.).
 * 
 * @returns list of 10 random numbers
 */
function get10RandomNumbers() {
    let numbers: Array<number> = [];
    
    while (numbers.length < 10) {
        // generates a random number between 0-length of the 'listWords'.
        let randomNumber = Math.floor(0 + Math.random()*( (listWords.length-1) - 0 + 1));

        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
        }
    }

    return numbers;
}

/**
 * Updates the daily challenge words in the database. 
 */
export async function updateWordsInDatabase() {
    console.log("In the updateWordInDatabase function")

    let numbers: Array<number> = get10RandomNumbers();

    var jsonObject = []

    for(var i in numbers) {
        jsonObject.push({spanish: listWords[numbers[i]][0], english: listWords[numbers[i]][1], type: listWords[numbers[i]][2]})
    }

    console.log("Created the json object")

    try {
        console.log("In the try catch block")
        await dailyRef.doc("testing").update({
            words: jsonObject
        });
    } catch (error) {
        return new Response("Something went wrong", {
            status: 500,
        })
    }
}