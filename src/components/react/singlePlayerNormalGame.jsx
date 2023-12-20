/**
 * This is a react component that will be used during the game.
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
 * Determines the message that will be posted to the client. Whether they won or lost and they have to try again. 
 * 
 * @param { innerHTML } container in which the message will be set.
 * @param { InputHTMLAttributes } guessField HTML input attribute.
 * @param { ButtonHTMLAttributes } guessButton HTML button attribute.
 * @param { String } message that will be posted in the container.
 */
function determineOutcome(container, guessField, guessButton, message) {
    container.innerHTML = message;
    guessField.style.display = 'none';
    guessButton.style.display = 'none';
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
 */
export default function Counter(props) {
    // All the words possible to use in the game.
    let words = props.wordsMap

    // words already come randomized so we can start with the first index. i.e. 0
    let currentWordIndex = 0;

    let currentNumberOfLives = 3;
    let correctNumberOfGuesses = 0;

    const handleClick = (e) => {
        // This prevents the eventHandler from refershing the page. We don't want the page to refresh until the game is finished.
        e.preventDefault();

        let nextWordContainer = document.getElementById('nextWordContainer');
        let guessField = document.getElementById('guessField');
        let scoreID = document.getElementById("score");
        let numberOfLives = document.getElementById('numberOfLives');
        let playAgainButton = document.getElementById("playAgainButton");

        const userGuess = guessField.value.toLowerCase();
        const currentWord = words[currentWordIndex];
        
        /* 
        The user got the correct answer, that means that there will be confetti, the background will turn green, 'correctNumberOfGuesses'
        and 'currentWordIndex' will be incremented by one. The score will be updated as well.
        */
        if (userGuess === currentWord.english.toLowerCase()) {
            confetti();

            nextWordContainer.parentElement.style.backgroundColor = 'green';
            
            correctNumberOfGuesses++

            scoreID.innerHTML = "Score: " + correctNumberOfGuesses.toString();

            /* 
            The user got 10 correct words with remaining lives. Meaning we tell them they won and we display the 'play again'
            button so they can play play again
            */
            if (correctNumberOfGuesses == 10) {
                determineOutcome(nextWordContainer, guessField, guessButton, 'You Win!');
                playAgainButton.style.display = "inline";
            }
            /*
            The user got the correct answer, they haven't reached the 10 points to win and there are still words in the words map to guess.
            Meaning the 'nextWordContainer' will be updated with the new word and the guessfield will be emptied so the user can guess again. 
            */
            else if (currentWordIndex < words.length) {
                currentWordIndex++;
                updateWord(currentWordIndex, nextWordContainer, guessField, words);
            }
        /*
        The user got the wrong answer, meaning we will decrease the currentNumberOfLives by one.
        */
        } else {
            currentNumberOfLives--;
            numberOfLives.innerText = "Lives: " + currentNumberOfLives.toString();
            nextWordContainer.parentElement.style.backgroundColor = 'red';

            /* 
            The user got the wrong answer and if the user has 0 lives, then they lose the game and the play again button will be
            displayed so they can play again.
            */
            if (currentNumberOfLives == 0) {
                determineOutcome(nextWordContainer, guessField, guessButton, 'You ran out of lives, try again.');
                playAgainButton.style.display = "inline";
            /* 
            The user got the wrong answer and if the user has lives left, then we move on to the next word meaning we will increase 
            the 'currentWordIndex' by one.
            */
            } else {
                currentWordIndex++;
                updateWord(currentWordIndex, nextWordContainer, guessField, words);
            }
        }
    }

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleClick}>
                <input type="text" id="guessField" className="block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96 "></input>
                <button style={{ display: 'inline' }}onClick={handleClick} id="guessButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-20 mt-4">Guess</button>
                <button style={{ display: 'none' }} onClick={() => window.location.reload(false)} id="playAgainButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Play again</button>
            </form>
        </div>
        
    );
}