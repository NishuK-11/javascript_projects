// Initialize game variables
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 1;
let resetButton;

// Select DOM elements
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const guessField = document.querySelector(".guessField");
const guessSubmit = document.querySelector(".guessSubmit");

// Function to check the user's guess
function checkGuess() {
  const userGuess = Number(guessField.value); // Convert input to a number

  // Display the list of guesses
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses:";
  }
  guesses.textContent = `${guesses.textContent} ${userGuess}`;

  // Check if the guess is correct
  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    lowOrHi.textContent = "";
    setGameOver();
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";    // Red background for wrong guess
    lastResult.style.color = "white";             // White text color for visibility

    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }

  // Increment guess count and reset the input field
  guessCount++;
  guessField.value = "";
  guessField.focus();
}

// End the game and prepare for reset
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;

  const resetContainer = document.querySelector(".gameOverOptions");
  resetContainer.style.display = "block";

  resetButton = document.querySelector(".resetGame");
  resetButton.addEventListener("click", resetGame);
}

// Reset the game
function resetGame() {
  guessCount = 1;

  const resultParas = document.querySelectorAll(".resultParas p");
  resultParas.forEach((para) => (para.textContent = ""));

  lastResult.style.backgroundColor = "white";

  const resetContainer = document.querySelector(".gameOverOptions");
  resetContainer.style.display = "none";

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  randomNumber = Math.floor(Math.random() * 100) + 1; // Generate a new random number
}

// Add event listener to submit button
guessSubmit.addEventListener("click", checkGuess);
