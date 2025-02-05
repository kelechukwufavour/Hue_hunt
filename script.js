document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const welcomeScreen = document.getElementById("welcome-screen");
    const gameContainer = document.getElementById("game-container");
    const targetBox = document.getElementById("target-box");
    const message = document.getElementById("message");
    const scoreDisplay = document.getElementById("score");
    const colorOptions = document.getElementById("colorOptions");
    const resetButton = document.getElementById("reset-btn");
    const levelSelect = document.getElementById("level");
    const timerDisplay = document.getElementById("timer");

    if (!startBtn || !welcomeScreen || !gameContainer || !targetBox || !message || !scoreDisplay || !colorOptions || !resetButton || !levelSelect || !timerDisplay) {
        console.error("One or more elements are missing in the HTML.");
        return;
    }

    startBtn.addEventListener("click", () => {
        welcomeScreen.style.display = "none"; // Hide welcome screen
        gameContainer.style.display = "block"; // Show game
        startGame();
    });

    // Reset & level change listeners
    resetButton.addEventListener("click", startGame);
    levelSelect.addEventListener("change", startGame);
});

// Game variables
const difficultyLevels = {
    easy: ["red", "blue", "green", "yellow", "purple", "pink"],
    medium: ["red", "blue", "green", "yellow", "purple", "pink", "orange", "black"],
    hard: ["red", "blue", "green", "yellow", "purple", "orange", "pink", "black", "brown", "white"]
};

let colors = [];
let targetColor = "";
let score = 0;
let timeLeft = 10;
let timerInterval;

// Start a new game
function startGame() {
    const targetBox = document.getElementById("target-box");
    const message = document.getElementById("message");
    const scoreDisplay = document.getElementById("score");
    const colorOptions = document.getElementById("colorOptions");
    const levelSelect = document.getElementById("level");
    const timerDisplay = document.getElementById("timer");

    if (!targetBox || !message || !scoreDisplay || !colorOptions || !levelSelect || !timerDisplay) {
        console.error("One or more game elements are missing.");
        return;
    }

    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = `Score: ${score}`;
    startNewRound();

    clearInterval(timerInterval); // Ensure no previous interval is running
    timerInterval = setInterval(updateTimer, 1000);
}

// Start a new round
function startNewRound() {
    const targetBox = document.getElementById("target-box");
    const message = document.getElementById("message");
    const colorOptions = document.getElementById("colorOptions");
    const levelSelect = document.getElementById("level");

    colors = difficultyLevels[levelSelect.value];
    targetColor = colors[Math.floor(Math.random() * colors.length)];

    targetBox.style.backgroundColor = targetColor;
    message.textContent = "Guess the correct color!";
    colorOptions.innerHTML = "";

    colors.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-button");
        button.style.backgroundColor = color;
        button.onclick = () => checkColor(color);
        colorOptions.appendChild(button);
    });
}

// Check color
function checkColor(color) {
    const message = document.getElementById("message");
    const scoreDisplay = document.getElementById("score");
    const targetBox = document.getElementById("target-box");

    if (color === targetColor) {
        message.textContent = "✅ Correct!";
        score++;
        targetBox.style.backgroundColor = targetColor;
        scoreDisplay.textContent = `Score: ${score}`;
        setTimeout(startNewRound, 1000);
    } else {
        message.textContent = "❌ Wrong! Try again.";
    }
}

// Timer countdown
function updateTimer() {
    const timerDisplay = document.getElementById("timer");
    const message = document.getElementById("message");

    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    } else {
        clearInterval(timerInterval);
        message.textContent = score === 0 ? "😞 Oops, try again!" : `🎉 Well done! Your score is ${score}`;
        setTimeout(startGame, 3000); // Start a new game after 3 seconds
    }
}