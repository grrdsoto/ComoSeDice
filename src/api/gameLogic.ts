const words: { spanish: string; english: string } [] = [
    { spanish: "gato", english: "cat" },
    { spanish: "perro", english: "dog" },
    { spanish: "casa", english: "house" },
    { spanish: "sol", english: "sun" },
    { spanish: "agua", english: "water" },
    { spanish: "amarillo", english: "yellow" },
    { spanish: "manzana", english: "apple" },
    { spanish: "rojo", english: "red" },
    { spanish: "arbol", english: "tree" },
    { spanish: "flor", english: "flower" },
];

let currentWordIndex = 0;

let wordContainer = document.getElementById('wordContainer');
const guessField = document.querySelectorAll('guess');
const guessButton = document.getElementById('guessButton');
const resultDiv = document.querySelectorAll('result');

function displayNextWord() {
    if (currentWordIndex < words.length) {
        wordContainer = `¿Como Se Dice? ${words[currentWordIndex].spanish}`;
        guessField.value = '';
        resultDiv.textContent = '';
    } else {
        wordContainer.textContent = 'Game Over';
        guessField.style.display = 'none';
        guessButton.style.display = 'none';
    }
}
guessButton.addEventListener('click', () => {
    console.log("Button clicked");
    const userGuess = guessField.value.toLowerCase();
    const currentWord = words[currentWordIndex];
    if (userGuess === currentWord.english.toLowerCase()) {
        resultDiv.textContent = 'Correct!';
        currentWordIndex++;
        wordContainer.empty();
        wordContainer.element = nextwor
        setTimeout(displayNextWord, 1000);
    } else {
        resultDiv.textContent = 'Incorrect. Try again.';
    }
});

displayNextWord();