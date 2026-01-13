const topics = [
    "Wino",
    "Zegarek",
    "Ogień",
    "Socjale",
    "Prasa",
    "Mięso",
    "Sneakersy (buty)",
    "Fotografia",
    "List",
    "Pies",
    "Telefon",
    "Garnitur",
    "Komputer",
    "Pieniądz",
    "Prąd",
    "Ludzkie ciało",
    "Warzywa",
    "Taksówka",
    "Samochód",
    "Święta Bożego Narodzenia",
    "Rozwód",
    "Podróż",
    "Szkolenie",
    "Weekend",
    "Mecz",
    "Rekrutacja (do pracy)",
    "Wojna",
    "Koncert",
    "Wybory (np. prezydenckie)",
    "Pandemia",
    "Kościół",
    "Dom Kultury",
    "Biblioteka",
    "Teatr",
    "Autostrada",
    "Stadion",
    "Plaża",
    "Centrum Handlowe",
    "Biurowiec",
    "Film",
    "Kino",
    "Targi (jak na MTP)",
    "Pub",
    "Jarmark",
    "Ślub",
    "Obraz (taki na ścianie)",
    "Zioła",
    "Szpital",
    "Remiza",
    "Budowa",
    "Uniwersytet",
    "Dożynki",
    "Urodziny",
    "Kredyt",
    "Węgiel",
    "Słońce",
    "Woda",
    "Wiatr",
    "Światło",
    "Ciemność",
    "Pogoda",
    "Wakacje",
    "Rower",
    "Samolot",
    "Szkoła",
    "Kawiarnia",
    "Książka",
    "Cukier",
    "Sól",
    "Ciąża",
    "Sąd",
    "Awokado",
    "Kebab",
    "Las",
    "Plac (np. Wolności)",
    "Bank",
    "Pistolet",
    "Pociąg",
    "Urlop",
    "Jezioro",
    "Stanie w kolejce",
    "Autobus",
    "Woda",
    "Ogród",
    "Balkon",
    "Łódź (taka pływająca)",
    "Muzeum",
    "Urodziny",
    "Prawo jazdy",
    "Pocałunek",
    "Matura",
    "Śmierć",
    "Samolot",
    "Lampa",
    "Tlen",
    "Kupno auta",
    "Podróż",
    "Działka",
    "Spektakl",
    "Więzienie",
    "Silnik",
    "Gniazdo (ptasie)",
    "Park",
    "Serwerownia",
    "Książka",
    "Wypadek samochodowy",
    "Eurowizja",
    "Maraton",
    "Remont",
    "Napiwek",
    "Pogrzeb",
    "Słuchawki",
    "Hasło",
    "Kamera",
    "Influencer",
    "Algorytm",
    "Lustro",
    "Tatuaż",
    "Szminka",
    "Broda",
    "Dieta",
    "Plastik",
    "Śmieci",
    "Marka",
    "Kurier",
    "Kanapa"
];

// === ZMIENNE GLOBALNE ===
let drawCount = 0;
let drawnTopics = [];
let timeoutActive = false;
let countdownTimer = null;

// === FUNKCJE POMOCNICZE ===
function getTimeoutDuration(count) {
    if (count >= 1 && count <= 3) return 30;
    if (count >= 4 && count <= 6) return 60;
    if (count >= 7 && count <= 9) return 90;
    return 0;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    return `${secs}s`;
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById('drawn-history');
    const historyList = document.getElementById('history-list');
    
    if (drawnTopics.length === 0) {
        historyContainer.style.display = 'none';
        return;
    }
    
    historyContainer.style.display = 'block';
    historyList.innerHTML = drawnTopics.map((topic, index) => 
        `<div class="history-item">
            <span class="history-number">${index + 1}.</span>
            <span class="history-topic">${topic}</span>
        </div>`
    ).join('');
}

function startCountdown(seconds) {
    const button = document.getElementById('draw-button');
    timeoutActive = true;
    let remaining = seconds;
    
    button.disabled = true;
    button.textContent = `Poczekaj ${formatTime(remaining)}`;
    
    countdownTimer = setInterval(() => {
        remaining--;
        
        if (remaining <= 0) {
            clearInterval(countdownTimer);
            button.disabled = false;
            button.textContent = 'Losuj ponownie';
            timeoutActive = false;
        } else {
            button.textContent = `Poczekaj ${formatTime(remaining)}`;
        }
    }, 1000);
}

function showFinalSelection() {
    const topicDisplay = document.getElementById('topic-display');
    const button = document.getElementById('draw-button');
    
    const topicsList = drawnTopics.map((topic, index) => 
        `<div class="previous-topic" data-topic="${topic}">
            <span class="topic-number">${index + 1}.</span> ${topic}
        </div>`
    ).join('');
    
    topicDisplay.innerHTML = `
        <div class="blocked-message">
            <p class="warning-text">⚠️ Osiągnięto limit 9 losowań!</p>
            <p class="instruction-text">Wybierz jeden z wcześniej wylosowanych tematów do pracy:</p>
            <div class="topics-list">${topicsList}</div>
        </div>
    `;
    
    button.style.display = 'none';
    
    // Dodaj obsługę kliknięć na tematy
    setTimeout(() => {
        document.querySelectorAll('.previous-topic').forEach(topicEl => {
            topicEl.addEventListener('click', function() {
                const selectedTopic = this.getAttribute('data-topic');
                topicDisplay.innerHTML = `<p class="topic-text selected-topic">✓ Wybrany temat: ${selectedTopic}</p>`;
                document.querySelectorAll('.previous-topic').forEach(el => {
                    el.style.pointerEvents = 'none';
                    el.style.opacity = '0.5';
                });
                this.style.opacity = '1';
            });
        });
    }, 100);
}

function drawTopic() {
    if (timeoutActive) return;
    if (drawCount >= 9) {
        showFinalSelection();
        return;
    }
    
    const button = document.getElementById('draw-button');
    const topicDisplay = document.getElementById('topic-display');
    
    button.disabled = true;
    button.textContent = 'Losuję...';
    
    // Wybierz losowy temat (unikaj duplikatów)
    let availableTopics = topics.filter(t => !drawnTopics.includes(t));
    if (availableTopics.length === 0) {
        availableTopics = [...topics];
    }
    
    const randomIndex = Math.floor(Math.random() * availableTopics.length);
    const selectedTopic = availableTopics[randomIndex];
    
    // Dodaj do historii
    drawnTopics.push(selectedTopic);
    drawCount++;
    
    // Pokaż wylosowany temat
    setTimeout(() => {
        topicDisplay.innerHTML = `<p class="topic-text">${selectedTopic}</p>`;
        updateHistoryDisplay();
        
        // Po 9 losowaniach - pokaż wybór finalny
        if (drawCount >= 9) {
            button.textContent = 'Zakończono losowanie';
            setTimeout(() => showFinalSelection(), 2000);
        } else {
            // Rozpocznij countdown - 30 sekund po każdym losowaniu
            startCountdown(30);
        }
    }, 800);
}

// === INICJALIZACJA ===
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('draw-button');
    button.addEventListener('click', drawTopic);
});
