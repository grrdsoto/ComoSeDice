import React from "react";


export default function Counter(props) {

    const clicks = 9;

    const handleClick = (numberOfRightAnswers) => {
        
        console.log("Hellow");
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