// --- 1. CONFIGURACIÓN Y ESTADO DEL JUEGO ---
const STATE = {
    score: 0,
    currentCard: null,
    nextCard: null, // Guarda la carta en previsión (Mecánica Tetris)
    columns: [[], [], [], []], // 4 columnas, el índice 0 es la base
    maxCards: 8, // Límite máximo de cartas permitido por columna
    gameOver: false
};

// Valores iniciales posibles para el mazo
const INITIAL_VALUES = [2, 4, 8, 16, 32];

// Diccionario de colores para las cartas usando clases de Tailwind
const CARD_COLORS = {
    2: 'bg-slate-100 text-slate-800',
    4: 'bg-slate-200 text-slate-800',
    8: 'bg-orange-200 text-orange-900',
    16: 'bg-orange-400 text-white',
    32: 'bg-orange-500 text-white',
    64: 'bg-red-400 text-white',
    128: 'bg-red-500 text-white',
    256: 'bg-yellow-300 text-yellow-900',
    512: 'bg-yellow-400 text-yellow-900',
    1024: 'bg-yellow-500 text-white',
    2048: 'bg-amber-600 text-white shadow-amber-500/50 shadow-lg'
};

// --- 2. REFERENCIAS AL DOM ---
const scoreEl = document.getElementById('score');
const currentCardEl = document.getElementById('current-card');
const nextPreviewCardEl = document.getElementById('next-preview-card');
const columnsEl = document.querySelectorAll('.column-target');
const btnRestart = document.getElementById('btn-restart');

// Referencias para el Game Over
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreEl = document.getElementById('final-score');
const btnRestartModal = document.getElementById('btn-restart-modal');

// --- 3. LÓGICA PRINCIPAL ---

// Función para inicializar o reiniciar el juego
function initGame() {
    STATE.score = 0;
    STATE.columns = [[], [], [], []];
    STATE.gameOver = false;
    
    gameOverModal.classList.add('hidden');
    
    updateScore();
    
    // Generamos las dos primeras cartas del mazo por separado
    STATE.currentCard = getRandomCardValue();
    STATE.nextCard = getRandomCardValue();
    
    updateDeckUI();
    renderColumns();
}

// Obtener un valor de carta aleatorio
function getRandomCardValue() {
    const randomIndex = Math.floor(Math.random() * INITIAL_VALUES.length);
    return INITIAL_VALUES[randomIndex];
}

// Actualizar visualmente ambos espacios del mazo (Mano y Previsión)
function updateDeckUI() {
    if (STATE.gameOver) return;

    // 1. Renderizar la carta en mano (actual)
    currentCardEl.className = `w-full h-full rounded-xl flex items-center justify-center text-3xl font-black shadow-md transition-all ${CARD_COLORS[STATE.currentCard] || 'bg-gray-900 text-white'}`;
    currentCardEl.textContent = STATE.currentCard;

    // 2. Renderizar la siguiente carta (vista previa)
    nextPreviewCardEl.className = `w-full h-full rounded-xl flex items-center justify-center text-2xl font-black shadow-md transition-all ${CARD_COLORS[STATE.nextCard] || 'bg-gray-900 text-white'}`;
    nextPreviewCardEl.textContent = STATE.nextCard;
}

// Manejar el clic en una columna
function handleColumnClick(event) {
    if (STATE.gameOver) return;

    const colIndex = parseInt(event.currentTarget.getAttribute('data-col'));
    const targetColumn = STATE.columns[colIndex];

    // Colocar la carta que tenemos actualmente en mano
    targetColumn.push(STATE.currentCard);
    
    // Procesar las fusiones de manera recursiva
    processMerges(colIndex);

    // Evaluación de derrota
    if (targetColumn.length > STATE.maxCards) {
        triggerGameOver();
        return;
    }

    // ROTACIÓN DE CARTAS: La que estaba en "Siguiente" pasa a "Mano"
    STATE.currentCard = STATE.nextCard;
    // Generamos una nueva carta aleatoria para la posición "Siguiente"
    STATE.nextCard = getRandomCardValue();

    updateScore();
    renderColumns();
    updateDeckUI();
}

// Sistema de Fusión Recursivo
function processMerges(colIndex) {
    const column = STATE.columns[colIndex];

    if (column.length < 2) return; 

    const topCard = column[column.length - 1];
    const cardBelow = column[column.length - 2];

    if (topCard === cardBelow) {
        const newValue = topCard * 2;
        STATE.score += newValue;

        column.pop();
        column.pop();

        if (newValue === 2048) {
            STATE.columns[colIndex] = [];
            console.log("¡Columna limpiada al alcanzar 2048!");
        } else {
            column.push(newValue);
            processMerges(colIndex);
        }
    }
}

// Activar la pantalla de derrota
function triggerGameOver() {
    STATE.gameOver = true;
    finalScoreEl.textContent = STATE.score;
    gameOverModal.classList.remove('hidden');
}

// Dibujar las cartas en las columnas
function renderColumns() {
    columnsEl.forEach((colEl, index) => {
        colEl.innerHTML = '';
        const colData = STATE.columns[index];

        colData.forEach((cardValue) => {
            const cardEl = document.createElement('div');
            cardEl.className = `w-full h-14 rounded-lg flex items-center justify-center text-xl font-bold shadow-sm transition-all ${CARD_COLORS[cardValue] || 'bg-gray-900 text-white'}`;
            cardEl.textContent = cardValue;
            colEl.appendChild(cardEl);
        });
    });
}

// Actualizar el marcador de puntos
function updateScore() {
    scoreEl.textContent = STATE.score;
}

// --- 4. EVENT LISTENERS ---
columnsEl.forEach(col => {
    col.addEventListener('click', handleColumnClick);
});

btnRestart.addEventListener('click', initGame);
btnRestartModal.addEventListener('click', initGame);

// Iniciar el juego por primera vez al cargar el script
initGame();