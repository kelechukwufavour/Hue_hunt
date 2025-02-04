const difficultyLevels = {
    easy: ["red", "blue", "green"],
    medium: ["red", "blue", "green", "yellow", "purple"],
    hard: ["red", "blue", "green", "yellow", "purple", "orange", "pink"]
};

let colors = [];
let targetColor = "";
let score = 0;
let timeLeft = 10;
let timerInterval;

const targetBox = document.getElementById("target-box");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const colorOptions = document.getElementById("colorOptions");
const resetButton = document.getElementById("reset-btn");
const levelSelect = document.getElementById("level");
const timerDisplay = document.getElementById("timer");

// Start the game
function startGame() {
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = `Score: ${score}`;
    startNewRound();

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Start a new round WITHOUT resetting the timer
function startNewRound() {
    colors = difficultyLevels[levelSelect.value];
    targetColor = colors[Math.floor(Math.random() * colors.length)];

    // Reset UI
    targetBox.style.backgroundColor = "transparent";
    message.textContent = "Guess the correct color!";
    colorOptions.innerHTML = "";

    // Generate color buttons
    colors.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-button");
        button.style.backgroundColor = color;
        button.onclick = () => checkColor(color);
        colorOptions.appendChild(button);
    });
}

// Check the guessed color
function checkColor(color) {
    if (color === targetColor) {
        message.textContent = "✅ Correct!";
        score++;
        targetBox.style.backgroundColor = targetColor;
        scoreDisplay.textContent = `Score: ${score}`;

        // Start a new round but keep the timer running
        setTimeout(startNewRound, 1000);
    } else {
        message.textContent = "❌ Wrong! Try again.";
    }
}

// Timer countdown
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    } else {
        clearInterval(timerInterval);
        targetBox.style.backgroundColor = targetColor; // Reveal target color

        // Display message based on score
        if (score === 0) {
            message.textContent = `😞 Oops, try again!`;
        } else {
            message.textContent = `🎉 Well done! Your score is ${score}`;
        }
        
        // Restart game after 3 seconds
        setTimeout(startGame, 3000);
    }
}

// Event Listeners
resetButton.addEventListener("click", startGame);
levelSelect.addEventListener("change", startGame);

// Initialize game
startGame();
