/*
This file is to help us get the images for the users profile picture.
*/

import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase/client";

// Instantiates the storage in which we have our images.
const myStorage = getStorage(app);

console.log("My storage: " + myStorage);

// Creates a reference to the 'profilePictures' folder, so we can manipulate it.
const imagesRef = ref(myStorage, 'profilePictures');

/**
 * Function that uses the 'imagesRef' to list all the instances in 'profilePictures' folder and get the urls
 * using 'getDownloadURL'. 'getDownloadURL' returns a promise, and since we got a map of promises, we need to deal
 * with them so we deal with them using the Promise.all method. 
 * 
 * @returns promises that need to be handled.
 */
async function fetchImages() {
    const result = await listAll(imagesRef);
    
    const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));

    return Promise.all(urlPromises);
}

/**
 * Method to get all the images by calling {fetchImages()}.
 * 
 * @returns map of urls.
 */
export async function getImagesMap() {
    const urlMap = await fetchImages();
    return urlMap;
}

