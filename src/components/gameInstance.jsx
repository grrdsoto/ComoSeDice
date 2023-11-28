// import words from 'words.jsx';

function game(gameType){
    switch (gameType) {
        case value:
            
            break;
    
        default:
            break;
    }

}
// import ReactDOM from 'react-dom/client';
//     class CurrentWordContainer extends React.Component {
//         constructor(props){
//             super(props);
//             this.state = {currentWord: words[currentWordIndex].spanish};
//         }
//         render(){
//             return(
//             <h1> ¿Como Se Dice? {this.state.currentWord}</h1>
//             );
//         }
//     }
//     ReactDOM.render(<CurrentWordContainer/>, document.getElementById('currentwordContainer'))


import confetti from "canvas-confetti";
import "../../styles.css";
import React from "react";
// const words: { spanish: english } [] = [
// { spanish: "gato", english: "cat" },
// { spanish: "perro", english: "dog" },
// { spanish: "casa", english: "house" },
// { spanish: "sol", english: "sun" },
// { spanish: "agua", english: "water" },
// { spanish: "amarillo", english: "yellow" },
// { spanish: "manzana", english: "apple" },
// { spanish: "rojo", english: "red" },
// { spanish: "arbol", english: "tree" },
// { spanish: "flor", english: "flower" },
// ];

let currentWordIndex = 0;

let nextWordContainer = document.getElementById('nextWordContainer');
let guessField = document.getElementById('guessField');
let guessButton = document.getElementById('guessButton');
let resultDiv = document.querySelectorAll('result');

function displayNextWord() {
    console.log("In displayNextWord") 
    if (currentWordIndex < words.length) {
        console.log("Here")
        nextWordContainer.textContent = "¿Como Se Dice? " + words[currentWordIndex].spanish;
        guessField.value = '';
        resultDiv.textContent = '';
    } else {
        nextWordContainer.textContent = 'You Win!';
        guessField.style.display = 'none';
        guessButton.style.display = 'none';
        
        // <Confetti/>

    } 
}
guessButton.addEventListener('click', () => { 
    checkAnswer();
});
document.addEventListener('keydown', function (e){
    console.log('pressed a key')
    if (e.key === 'Enter'){
        checkAnswer();
    }
});
function checkAnswer(){
    const userGuess = guessField.value.toLowerCase();
    console.log("Print userGuess " + userGuess);
    const currentWord = words[currentWordIndex];
    console.log("Print currentWord " + currentWord.spanish.toLowerCase());
    if (userGuess === currentWord.english.toLowerCase()) {

        console.log("Correct plus one point");
        // resultDiv.textContent = 'Correct!';
        confetti();
        changeColor("Correct");
        currentWordIndex++;
        displayNextWord();
    } else {
        // console.log("Not correct");
        guessField.value = '';
        // resultDiv.textContent = 'Incorrect. Try again.';
        changeColor("Incorrect");
    }
}
function changeColor(choice){
    if (choice == "Correct"){
        // nextWordContainer.parentElement.style.backgroundColor.addClass("backgroundAnimated");
        nextWordContainer.parentElement.style.backgroundColor = 'green';
    } else if (choice == "Incorrect"){
        console.log("red");
        nextWordContainer.parentElement.style.backgroundColor = 'red';
    }        
}
// function playAgain(){
//     if (playAgain active){
//         currentWordIndex=0;
//     }
// }