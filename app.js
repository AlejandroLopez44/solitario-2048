// --- 1. CONFIGURACIÓN Y ESTADO DEL JUEGO ---
const STATE = {
    score: 0,
    currentCard: null,
    columns: [[], [], [], []], // 4 columnas, el índice 0 es la base
    maxCards: 8 // Límite máximo de cartas por columna [cite: 34]
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
const nextCardEl = document.getElementById('next-card');
const columnsEl = document.querySelectorAll('.column-target');
const btnRestart = document.getElementById('btn-restart');

// --- 3. LÓGICA PRINCIPAL ---

// Función para inicializar o reiniciar el juego
function initGame() {
    STATE.score = 0;
    STATE.columns = [[], [], [], []];
    updateScore();
    generateNextCard();
    renderColumns();
}

// Generar una nueva carta aleatoria en el mazo
function generateNextCard() {
    const randomIndex = Math.floor(Math.random() * INITIAL_VALUES.length);
    STATE.currentCard = INITIAL_VALUES[randomIndex];
    
    // Actualizar visualmente la carta del mazo
    nextCardEl.className = `w-full h-full rounded-xl flex items-center justify-center text-3xl font-black shadow-md transition-all ${CARD_COLORS[STATE.currentCard] || 'bg-gray-900 text-white'}`;
    nextCardEl.textContent = STATE.currentCard;
    nextCardEl.classList.remove('hidden');
}

// Manejar el clic en una columna
function handleColumnClick(event) {
    // Identificar qué columna fue clickeada
    const colIndex = parseInt(event.currentTarget.getAttribute('data-col'));
    const targetColumn = STATE.columns[colIndex];

    // Verificar si la columna ya está llena
    if (targetColumn.length >= STATE.maxCards) {
        alert("¡Esta columna está llena!"); // Próximamente lo cambiaremos por el Game Over
        return;
    }

    // 1. Agregar la carta a la columna
    targetColumn.push(STATE.currentCard);
    
    // 2. Procesar las fusiones de manera recursiva
    processMerges(colIndex);

    // 3. Renderizar los cambios, actualizar puntos y generar la siguiente carta
    updateScore();
    renderColumns();
    generateNextCard();
}

// Sistema de Fusión Recursivo
function processMerges(colIndex) {
    const column = STATE.columns[colIndex];

    // Condición base de recursividad: Necesitamos al menos 2 cartas para poder fusionar
    if (column.length < 2) {
        return; 
    }

    // Obtener las dos cartas superiores
    const topCard = column[column.length - 1];
    const cardBelow = column[column.length - 2];

    // Si son iguales, ¡se fusionan!
    if (topCard === cardBelow) {
        const newValue = topCard * 2;
        
        // Sumar al marcador
        STATE.score += newValue;

        // Eliminar las dos cartas antiguas
        column.pop();
        column.pop();

        // Efecto especial: ¿Llegó a 2048?
        if (newValue === 2048) {
            // Se limpia toda la columna
            STATE.columns[colIndex] = [];
            console.log("¡Columna limpiada al alcanzar 2048!");
        } else {
            // Si no es 2048, agregamos la nueva carta fusionada a la columna
            column.push(newValue);
            
            // ¡RECURSIVIDAD! Volvemos a llamar a la función para ver si la nueva carta
            // se puede fusionar con la que ahora quedó debajo de ella.
            processMerges(colIndex);
        }
    }
}

// Dibujar las cartas en las columnas
function renderColumns() {
    columnsEl.forEach((colEl, index) => {
        // Limpiar la columna visualmente
        colEl.innerHTML = '';
        const colData = STATE.columns[index];

        // Iterar sobre los datos de la columna para crear las cartas visuales
        // Se renderizan de abajo hacia arriba gracias al flex-col justify-end
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

// Iniciar el juego por primera vez al cargar el script
initGame();