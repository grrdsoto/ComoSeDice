import listWords from "./words";

function shuffle(array: any) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

// Endpoint that is called that will return a json object with 10 words.
export async function GET() {
    let randomizedArray = shuffle(listWords);
    console.log("Words after being randomized: " + randomizedArray);

    var jsonObject = []

    for(var i in listWords) {
        jsonObject.push({spanish: listWords[i][0], english: listWords[i][1], type: listWords[i][2]})
    }

    return new Response (
        JSON.stringify(jsonObject)
    )
}