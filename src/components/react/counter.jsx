import React from 'react';
import { useTimer } from 'react-timer-hook';

/**
 * Function that will call the updateScore endpoint to update the users score if they have a new high score. 
 * 
 * @param {string} id - uid of the user that is logged in. 
 */
function updateBestScore(id) {
  let userScore = document.getElementById("score");
  let bestScore = document.getElementById("bestScore");

  if (parseInt(userScore.textContent.split(" ")[1]) > parseInt(bestScore.textContent.split(" ")[2])) {
    fetch("http://localhost:4321/api/users/updateScore" + id, {
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
    document.getElementById('timedGameModeModal').showModal();
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
