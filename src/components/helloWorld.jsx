/**
 * This is a react component that will be used during the game.
 * 
 */
import React from "react";
import confetti from "canvas-confetti"
import "../styles.css"


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
 * Function that allows us to handle the game logic. props contains all 3 paramaters, i.e. id, user, and wordsMap.
 * To get the parameters do props.id, props.user, props.wordsMap.
 * 
 * @param { id } - id of the user that is logged in.
 * @param { user } - user snapshot that contains the information of the user that is logged in. 
 * @param { wordsMap } - word to use when updated.
 * @returns 
 */
export default function Counter(props) {

    let url = "http://localhost:4321/api/users/" + props.id;

    let currentWordIndex = 0;

    let currentNumberOfLives = 3;
    let correctNumberOfGuesses = 0;

    let words = props.wordsMap

    const handleClick = (e) => {
        // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
        e.preventDefault();
        let nextWordContainer = document.getElementById('nextWordContainer');
        let guessField = document.getElementById('guessField');

        let numberOfLives = document.getElementById('numberOfLives');

        const userGuess = guessField.value.toLowerCase();
        const currentWord = words[currentWordIndex];
        
        /* 
        The user got the correct answer, that means that there will be confetti, the background will turn green, 'correctNumberOfGuesses'
        and 'currentWordIndex' will be incremented by one.
        */
        if (userGuess === currentWord.english.toLowerCase()) {
            confetti();
            nextWordContainer.parentElement.style.backgroundColor = 'green';
            correctNumberOfGuesses++
            currentWordIndex++;

            /*
            The user got the correct answer and there are still words in the words map to guess. Meaning the nextWordContainer will be updated with the new word
            and the guessfield will be emptied so the user can guess again. 
            */
            if (currentWordIndex < words.length) {
                nextWordContainer.innerHTML = "Como Se Dice " + words[currentWordIndex].spanish + " (" + words[currentWordIndex].type.italics() + ")" + "?";
                guessField.value = '';
            /*
            The user got the correct answer and there are no more words to guess. This also means they have not run out of lives so they have won the game.
            So we let them know they have won!
            */
            } else {
                /*
                The user won the game, so now we check if their correctNumberOfGuesses was higher than their best score.
                If it is higher than their high score, then it is updated in the UI and we make a call to the database
                to update their high score.
                */
                if (correctNumberOfGuesses > props.user.normalGameMode.bestScore) {
                    updateBestScore(url, correctNumberOfGuesses);

                    let bestScoreID = document.getElementById("bestScore");
                    bestScoreID.innerHTML = "Best score: " + correctNumberOfGuesses;

                }

                nextWordContainer.innerHTML = 'You Win!';

                guessField.style.display = 'none';
                guessButton.style.display = 'none';
          } 
        /*
        The user got the wrong answer, meaning we will decrease the currentNumberOfLives by one.
        */
        } else {
            guessField.value = '';

            currentNumberOfLives--;
            numberOfLives.innerText = "Lives: " + currentNumberOfLives.toString();
            // resultDiv.textContent = 'Incorrect. Try again.';
            nextWordContainer.parentElement.style.backgroundColor = 'red';

            // If the user has 0 lives, then they lose the game and have to restart. 
            if (currentNumberOfLives == 0) {
                nextWordContainer.innerHTML = 'You ran out of lives, try again.'

                guessField.style.display = 'none';
                guessButton.style.display = 'none';
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleClick}>
                <input type="text" id="guessField" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                <button onClick={handleClick} id="guessButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guess</button>
            </form>
        </div>
        
    );
}