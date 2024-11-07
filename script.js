let count = 0;

document
    .getElementById("button-clicker")
    .addEventListener("click", () => {
       count++;
       document.getElementById("counter").innerHTML = count;
})

// Initialisation des secondes et minutes
let seconds = 0;
let minutes = 0;

// Sélection de l'élément du minuteur
const timerDisplay = document.getElementById("timer");

// Fonction pour mettre à jour le minuteur
function updateTimer() {
    seconds++;
    
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    
    // Formate les minutes et les secondes pour qu'elles soient toujours à deux chiffres
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
    // Met à jour l'affichage du minuteur
    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Démarrage du minuteur (mise à jour chaque seconde)
setInterval(updateTimer, 1000);
