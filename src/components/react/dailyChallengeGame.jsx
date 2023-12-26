/**
 * This is a react component that will be used for the daily challenge game.
 * 
 */
import React from "react";
import confetti from "canvas-confetti"
import "../../styles.css"


/**
 * Makes an api call to the dynamic id endpoint and updates the database with the new best score of the user. 
 * Calls http://localhost:<port>/api/users/<id>
 * 
 * @param {string} url dynamic url that contains the id of the user to update their score. 
 * @param {integer} score score of the user.
 */
async function updateBestScore(url, score) {
    fetch(url, {
        method: "POST",
        header: { 
            "Accept": "application/json",
            "Content-Type": "application/json"},
        body: JSON.stringify( {
                bestScore: score,
                gamesPlayed: 0,
        })
    }).then(() => {
        console.log("Updated");
    })
}

/**
 * Updates the container that holds the word to be guessed and clears the guess field so the user can guess again.
 * 
 * @param { number } index 
 * @param { innerHTML } container in which the message will be set.
 * @param { InputHTMLAttributes } guessField HTML input attribute.
 * @param { List } words object containing all words available.
 */
function updateWord(index, container, guessField, words) {
    console.log("Word in spanish: " + words[index].spanish);
    console.log("Word in english: " + words[index].english);
    container.innerHTML = "Cómo Se Dice "  + words[index].spanish.bold() + " (" + words[index].type.italics() + ")" + "?";
    guessField.value = '';
}

/**
 * Function that handles the game logic. 'props' contains all 3 paramaters, i.e. id, user, and wordsMap.
 * To get the values of the parameters use dot notation: i.e. props.id, props.user, props.wordsMap.
 * 
 * @param { id } - id of the user that is logged in.
 * @param { user } - user snapshot that contains the information of the user that is logged in. 
 * @param { wordsMap } - word to use when updated.
 * @returns 
 */
export default function Counter(props) {

    let user = props.user;

    let currentWordIndex = 0;

    let correctNumberOfGuesses = 0;

    let words = props.wordsMap

    for (let i = 0; i < words.length; i++) {
        console.log ("Word " + i + " " + words[i].spanish);
      }

    const handleClick = (e) => {
        // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
        e.preventDefault();
        let nextWordContainer = document.getElementById('nextWordContainer');
        let guessField = document.getElementById('guessField');
        let scoreID = document.getElementById("score");
        let time = document.getElementById("timerText");

        const userGuess = guessField.value.toLowerCase();
        const currentWord = words[currentWordIndex];

        /* 
        The user got the correct answer, that means that there will be confetti, the background will turn green, 'correctNumberOfGuesses'. 
        The score will be updated as well.
        */
        if (userGuess === currentWord.english.toLowerCase()) {
            confetti();
            nextWordContainer.parentElement.style.backgroundColor = 'green';
            
            correctNumberOfGuesses++

            scoreID.innerHTML = "Score: " + correctNumberOfGuesses.toString();
        /**
         * The user got the wrong answer so we clear the 'guessField' and change the 'nextWordContainer' background color to red.
         */
        } else {
            guessField.value = '';

            nextWordContainer.parentElement.style.backgroundColor = 'red';
        }   
        
         /**
             * We only have 10 words, so we check if we still have words to go through by checking if the currentWordIndex is smaller than 
             * the length of the array of words.
             */
        if (currentWordIndex < words.length - 1) {
            currentWordIndex++;
            updateWord(currentWordIndex, nextWordContainer, guessField, words);
        } else {
            time.textContent = time.textContent;
            console.log("Game over");

            document.getElementById("userOficialTime").textContent = "Score: " + correctNumberOfGuesses + " Time: " + time.textContent;

            document.getElementById('dailyChallengeModal').showModal();
        }
    }

    return (
        <div className="flex justify-center items-center">

            <dialog id="dailyChallengeModal" className="rounded-lg max-w-lg border modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <div className="max-w-l p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Daily Challenge Complete!</h5>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {user.username}</p>
                        <p id="userOficialTime" className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                        
                        <a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Done
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>

                </div>
            </dialog>

            <form onSubmit={handleClick}>
                <input autoComplete="one-time-code" type="text" id="guessField" className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96 "></input>
                <button style={{ display: 'inline' }} onClick={handleClick} id="guessButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-4">Guess</button>
            </form>
        </div>
        
    );
}