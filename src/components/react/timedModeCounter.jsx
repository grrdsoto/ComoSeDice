import React from 'react';
import confetti from "canvas-confetti"
import { useTimer } from "react-timer-hook";

/**
 * Function that will call the updateScore endpoint to update the users score if they have a new high score. 
 * 
 * @param {string} id - uid of the user that is logged in. 
 */
function updateBestScore(id) {
  let userScore = document.getElementById("timedModeScore");
  let bestScore = document.getElementById("timedModeBestScore");

  /*
  If the user gets a high score i.e. userscore > bestscore, then the updateScore[id] endpoint will be called
  to update the users best time score in the database. The score will be updated in the page and the 'timed mode modal'
  will be shown.
  */
  if (parseInt(userScore.textContent.split(" ")[1]) > parseInt(bestScore.textContent.split(" ")[2])) {
    fetch(import.meta.env.PINCHE_URL + "/api/users/updateScore" + id, {
      method: "POST",
      header: { 
          "Accept": "application/json",
          "Content-Type": "application/json"},
      body: JSON.stringify( {
              bestScore: parseInt(userScore.textContent.split(" ")[1]),
              gamesPlayed: 0,
      })
    }).then(() => {
        console.log("Updated");
    })

    bestScore.innerHTML = "Best score: " + userScore.textContent.split(" ")[1];
    document.getElementById("userOficialHighScore").textContent = "New High Score: " + userScore.textContent.split(" ")[1];
    confetti();
    document.getElementById('timedGameModeModal').showModal();
  // If the user does not get a high score, the play again button will show.
  } else {
    let nextWordContainer = document.getElementById('nextWordContainer');
    let guessField = document.getElementById('timedModeGuessField');
    let guessButton = document.getElementById("timedModeGuessButton");
    let playAgainButton = document.getElementById("timedModePlayAgainButton");

    nextWordContainer.innerHTML = "Time up!";
    guessField.style.display = 'none';
    guessButton.style.display = 'none';
    playAgainButton.style.display = "inline";
  }
}

/**
 * Function that handles the timer that is used in the timer game mode.
 * 
 * @param { seconds } expiryTimestamp - the amount of time the timer will be 
 * @param { string } id - uid of the user that is logged in.  
 * @returns 
 */
export default function MyTimer(props) {

  let expiryTimestamp = props.expiryTimestamp;
  let id = props.id;

  const {
    seconds,
    minutes,
  } = useTimer({ expiryTimestamp, onExpire: () => updateBestScore(id) });

  const formatTime = (time) => {
    return String(time).padStart(2, '0')
  }

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '30px'}}>
        <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
      </div>
    </div>
  );
}
