/**
 * This is a react component that will be used during the game.
 */
import React from "react";

/**
 * Function that allows us to handle the game logic.
 * 
 * @param { id } - id of the user that is logged in.
 * @param { user } - user snapshot that contains the information of the user that is logged in. 
 * @param { wordsMap } - word to use when updated.
 * @returns 
 */
export default function Counter(props) {

    const handleClick = (numberOfRightAnswers) => {
        console.log("My first word: " + props.wordsMap[0].spanish)

        const clicks = 9;

        console.log("This is my username: " + props.user.username)

        let answerColor = nextWordContainer.parentElement.style.backgroundColor

        console.log("Answer color: " + answerColor)
        
        console.log("This is my id " + props.id)

        let url = "http://localhost:4321/api/users/" + props.id;

        console.log("My URL " + url)

        if (numberOfRightAnswers > clicks) {
            fetch(url, {
                method: "POST",
                header: { 
                    "Accept": "application/json",
                    "Content-Type": "application/json"},
                body: JSON.stringify( {
                        bestScore: numberOfRightAnswers,
                        gamesPlayed: 0,
                })
            }).then(() => {
                console.log("Updated");
            })
        } else { 
            console.log("I haven't hit the mark");
        }
    }

    return (
        <div>
            <button onClick={() => handleClick(7)} id="guessButton" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guess</button>
        </div>
        
    );
}