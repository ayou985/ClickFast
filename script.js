let count = 0;

document
    .getElementById("button-clicker")
    .addEventListener("click", () => {
       count++;
       document.getElementById("counter").innerHTML = count;
})

let timeLeft = 0; // Temps restant pendant le jeu
let clickCount = 0; // Nombre de clics
let gameTimer; // Variable pour stocker l'intervalle du jeu

// Éléments HTML
const timerDisplay = document.getElementById("timer");
const clickButton = document.getElementById("button-clicker");
const scoreDisplay = document.getElementById("counter");
const startButton = document.getElementById("start-game");
const timeSelect = document.getElementById("time-select");

// Fonction pour mettre à jour le minuteur
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        endGame();
    }
}

// Démarrage du jeu
function startGame() {
    // Récupère la durée sélectionnée et initialise le jeu
    timeLeft = parseInt(timeSelect.value);
    clickCount = 0;

    // Affiche le minuteur initial et le score
    timerDisplay.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
    scoreDisplay.textContent = clickCount;

    // Cache le bouton de démarrage et affiche le bouton de clic
    startButton.style.display = "none";
    clickButton.style.display = "inline-block";
    
    clickButton.disabled = false;

    // Déclenche le minuteur pour le jeu
    gameTimer = setInterval(updateTimer, 1000);
}

// Fonction de fin de jeu
function endGame() {
    clearInterval(gameTimer);
    clickButton.disabled = true;
    startButton.style.display = "inline-block"; // Réaffiche le bouton de démarrage
    startButton.disabled = false;
    alert(`Temps écoulé ! Vous avez cliqué ${clickCount} fois.`);
}

// Compte les clics et met à jour le score
clickButton.addEventListener("click", () => {
    clickCount++;
    scoreDisplay.textContent = clickCount;
});

// Démarre le jeu quand on clique sur le bouton "Démarrer le jeu"
startButton.addEventListener("click", startGame);
