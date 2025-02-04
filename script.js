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

// Start a new round with a timer
function startNewRound() {
    colors = difficultyLevels[levelSelect.value];
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Reset UI
    targetBox.style.backgroundColor = "transparent";
    message.textContent = "Guess the correct color!";
    colorOptions.innerHTML = "";

    // Generate color options
    colors.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-button");
        button.style.backgroundColor = color;
        button.onclick = () => checkColor(color);
        colorOptions.appendChild(button);
    });

    // Reset timer
    clearInterval(timerInterval);
    timeLeft = 10;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    timerInterval = setInterval(updateTimer, 1000);
}

// Check the guessed color
function checkColor(color) {
    if (color === targetColor) {
        message.textContent = "✅ Correct!";
        score++;
        targetBox.style.backgroundColor = targetColor;
        clearInterval(timerInterval); // Stop the timer
        setTimeout(startNewRound, 1000); // Start a new round after 1s
    } else {
        message.textContent = "❌ Wrong! Try again.";
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

// Timer countdown
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    } else {
        clearInterval(timerInterval);
        message.textContent = "⏳ Time's up! Try again.";
        targetBox.style.backgroundColor = targetColor;
    }
}

// Event Listeners
resetButton.addEventListener("click", startNewRound);
levelSelect.addEventListener("change", startNewRound);

// Initialize game
startNewRound();
