let count = 0;

document
    .getElementById("button-clicker")
    .addEventListener("click", () => {
       count++;
       document.getElementById("counter").innerHTML = count;
});

let timeLeft = 0;  
let clickCount = 0;  
let gameTimer;  

 const timerDisplay = document.getElementById("timer");
const clickButton = document.getElementById("button-clicker");
const scoreDisplay = document.getElementById("counter");
const startButton = document.getElementById("start-game");
const timeSelect = document.getElementById("time-select");

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

 function startGame() {
    timeLeft = parseInt(timeSelect.value);
    clickCount = 0;

     timerDisplay.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
    scoreDisplay.textContent = clickCount;

     startButton.style.display = "none";
    clickButton.style.display = "inline-block";
    
    clickButton.disabled = false;

     gameTimer = setInterval(updateTimer, 1000);
}

 function endGame() {
    clearInterval(gameTimer);
    clickButton.disabled = true;
    startButton.style.display = "inline-block";  
    startButton.disabled = false;
    alert(`Temps écoulé ! Vous avez cliqué ${clickCount} fois.`);
}

 clickButton.addEventListener("click", () => {
    clickCount++;
    scoreDisplay.textContent = clickCount;
});

 startButton.addEventListener("click", startGame);

 async function getAccessToken() {
    const clientId = '05c932a26eac4fbebff1c9debe349440';  
    const clientSecret = '8935c435697644bdb04adfc2509124be';  

    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = new URLSearchParams({
        'grant_type': 'client_credentials'
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });
        const data = await response.json();
        return data.access_token;  
    } catch (error) {
        console.error('Erreur lors de l\'obtention de l\'access token:', error);
    }
}

 async function searchMusic() {
    const searchQuery = document.getElementById('searchInput').value.trim();
    if (searchQuery === "") {
        alert("Veuillez entrer un terme de recherche.");
        return;
    }

    const token = await getAccessToken();
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=5`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        const tracks = data.tracks.items;

        if (tracks.length === 0) {
            document.getElementById('musicResults').innerHTML = 'Aucune musique trouvée.';
            return;
        }

         document.getElementById('musicResults').innerHTML = '';

         tracks.forEach(track => {
            const trackElement = document.createElement('div');
            trackElement.classList.add('music-item');
            trackElement.innerHTML = `
                <img src="${track.album.images[0].url}" alt="${track.name}" class="music-thumbnail">
                <p class="music-title">${track.name}</p>
                <p class="music-artist">${track.artists[0].name}</p>
                <button onclick="playMusic('${track.uri}')">Écouter</button>
            `;
            document.getElementById('musicResults').appendChild(trackElement);
        });
    } catch (error) {
        console.error('Erreur lors de la recherche de musique:', error);
    }
}

 function playMusic(trackUri) {
    const audioPlayer = document.getElementById('audioPlayer');

     const trackId = trackUri.split(':')[2];

     audioPlayer.src = `https://open.spotify.com/embed/track/${trackId}`;

     audioPlayer.play();
}
