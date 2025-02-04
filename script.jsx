const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let targetColor = "";
let score = 0;

const colorBox = document.getElementById("color-box");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const colorButtons = document.getElementById("color-buttons");
const newGameButton = document.getElementById("new-game");

// Generate new random color
function setNewColor() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    message.textContent = "Guess the correct color!";
}

// Check the guessed color
function checkColor(color) {
    if (color === targetColor) {
        message.textContent = "✅ Correct!";
        score++;
    } else {
        message.textContent = "❌ Wrong! Try again.";
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

// Create color buttons dynamically
colors.forEach(color => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.textContent = color;
    button.onclick = () => checkColor(color);
    colorButtons.appendChild(button);
});

// Restart the game
newGameButton.addEventListener("click", setNewColor);

// Initialize game
setNewColor();
 