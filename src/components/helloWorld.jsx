/**
 * This is a react component that will be used during the game.
 */
import React from "react";
import confetti from "canvas-confetti"
import "../styles.css"

/**
 * Function that allows us to handle the game logic.
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

    const handleClick = () => {
        let nextWordContainer = document.getElementById('nextWordContainer');
        let guessField = document.getElementById('guessField');
        let guessButton = document.getElementById('guessButton');
        let resultDiv = document.querySelectorAll('result');

        let numberOfLives = document.getElementById('numberOfLives');

        const userGuess = guessField.value.toLowerCase();
        console.log("Print userGuess " + userGuess);
        const currentWord = words[currentWordIndex];
        console.log("Print currentWord " + currentWord.spanish.toLowerCase());
        
        if (userGuess === currentWord.english.toLowerCase()) {
            console.log("Correct plus one point");
            confetti();
            nextWordContainer.parentElement.style.backgroundColor = 'green';
            correctNumberOfGuesses++
            console.log("CorrectNumberOfGuesses " + correctNumberOfGuesses);
            currentWordIndex++;

            if (currentWordIndex < words.length) {
                console.log("Here")
                nextWordContainer.textContent = "Como Se Dice " + words[currentWordIndex].spanish + "?";
                guessField.value = '';
                resultDiv.textContent = '';
            } else {
                nextWordContainer.textContent = 'You Win!';

                if (correctNumberOfGuesses > props.user.normalGameMode.bestScore) {
                    fetch(url, {
                        method: "POST",
                        header: { 
                            "Accept": "application/json",
                            "Content-Type": "application/json"},
                        body: JSON.stringify( {
                                bestScore: correctNumberOfGuesses,
                                gamesPlayed: 0,
                        })
                    }).then(() => {
                        console.log("Updated");
                    })

                    let bestScoreID = document.getElementById("bestScore");
                    bestScoreID.textContent = "Best score: " + correctNumberOfGuesses;
                } else { 
                    console.log("I haven't hit the mark");
                }

                guessField.style.display = 'none';
                guessButton.style.display = 'none';
          } 

        } else {
            console.log("Not correct");
            guessField.value = '';

            currentNumberOfLives--;
            numberOfLives.innerText = "Lives: " + currentNumberOfLives.toString();
            // resultDiv.textContent = 'Incorrect. Try again.';
            nextWordContainer.parentElement.style.backgroundColor = 'red';
        }

        
    }

    return (
        <div>
            <button onClick={handleClick} id="guessButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guess</button>
        </div>
        
    );
}