document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const gameContainer = document.getElementById("game-container");
    const startButton = document.getElementById("start-btn");

    const targetBox = document.getElementById("target-box");
    const message = document.getElementById("message");
    const scoreDisplay = document.getElementById("score");
    const colorOptions = document.getElementById("colorOptions");
    const resetButton = document.getElementById("reset-btn");

    const colors = ["red", "blue", "green", "yellow", "purple", "pink"];
    let targetColor = "";
    let score = 0;

    // Function to start the game
    function startGame() {
        welcomeScreen.style.display = "none";
        gameContainer.style.display = "block";
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
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

        resetButton.style.display = "none"; // Hide reset button until needed
    }

    // Function to check selected color
    function checkColor(color) {
        if (color === targetColor) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            message.textContent = "✅ Correct!";
            message.setAttribute("data-testid", "gameStatus");

            setTimeout(startNewRound, 1000); // Wait 1 sec before changing color
        } else {
            message.textContent = "❌ Oops! Try again.";
            message.setAttribute("data-testid", "gameStatus");
        }
        
        resetButton.style.display = "block"; // Show reset button after any guess
    }

    // Reset the game
    resetButton.addEventListener("click", startGame);
    resetButton.setAttribute("data-testid", "newGameButton");

    // Start game when button is clicked
    startButton.addEventListener("click", startGame);
});
