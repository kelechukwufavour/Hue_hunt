document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const gameContainer = document.getElementById("game-container");
    const startButton = document.getElementById("start-btn");

    const targetBox = document.getElementById("target-box");
    const message = document.getElementById("message");
    const scoreDisplay = document.getElementById("score");
    const colorOptions = document.getElementById("colorOptions");
    const resetButton = document.getElementById("reset-btn");

    let colors = ["red", "blue", "green", "yellow", "purple", "pink"];
    let targetColor = "";
    let score = 0;

    // Function to start the game
    function startGame() {
        welcomeScreen.style.display = "none";
        gameContainer.style.display = "block";
        startNewRound();
    }

    // Function to start a new round
    function startNewRound() {
        targetColor = colors[Math.floor(Math.random() * colors.length)];
        targetBox.style.backgroundColor = targetColor;
        targetBox.setAttribute("data-testid", "colorBox");

        message.textContent = "Guess the correct color!";
        message.setAttribute("data-testid", "gameInstructions");

        colorOptions.innerHTML = "";

        colors.forEach(color => {
            const button = document.createElement("button");
            button.classList.add("color-button");
            button.style.backgroundColor = color;
            button.setAttribute("data-testid", "colorOption");
            button.onclick = () => checkColor(color);
            colorOptions.appendChild(button);
        });
    }

    // Function to check selected color
    function checkColor(color) {
        if (color === targetColor) {
            message.textContent = "✅ Correct!";
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            scoreDisplay.setAttribute("data-testid", "score");
            setTimeout(startNewRound, 1000);
        } else {
            message.textContent = "❌ Wrong! Try again.";
        }
        message.setAttribute("data-testid", "gameStatus");
    }

    // Reset the game
    resetButton.addEventListener("click", startNewRound);
    resetButton.setAttribute("data-testid", "newGameButton");

    // Start game when button is clicked
    startButton.addEventListener("click", startGame);
});