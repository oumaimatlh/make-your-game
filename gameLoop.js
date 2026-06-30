import { maze } from "./maze.js";

// STATE
var state = {
    pacMan: {
        row: 11,
        col: 9,
        direction: null,
        moveTimer: 0,
        moveDelay: 110
    },
    score: 0,
    lives: 3,
    lastTime: 0,
    deltaTime: 0,
};

window.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        state.pacMan.direction = event.key;
    }
});

function update() {
    if (!state.pacMan.direction) return;

    state.pacMan.moveTimer += state.deltaTime * 1000;
    if (state.pacMan.moveTimer < state.pacMan.moveDelay) return;

    state.pacMan.moveTimer = 0;

    let newRow = state.pacMan.row;
    let newCol = state.pacMan.col;

    switch (state.pacMan.direction) {
        case "ArrowRight": newCol++; break;
        case "ArrowLeft":  newCol--; break;
        case "ArrowUp":    newRow--; break;
        case "ArrowDown":  newRow++; break;
    }

    if (newRow < 0 || newRow >= maze.length || 
        newCol < 0 || newCol >= maze[0].length || 
        maze[newRow][newCol] === 1) {
        return;
    }

    // Déplacement
    state.pacMan.row = newRow;
    state.pacMan.col = newCol;

    // Manger le dot + suppression visuelle
    if (maze[newRow][newCol] === 6) {
        maze[newRow][newCol] = 0;
        state.score += 10;

        // Suppression visuelle du dot
        const cells = document.querySelectorAll('#maze .cell');
        const index = newRow * maze[0].length + newCol;
        const cell = cells[index];

        const dot = cell.querySelector('.pac-dot');
        if (dot) dot.remove();
    }
}

function render() {
    // Supprimer l'ancien Pac-Man
    const oldPac = document.getElementById("pacman-container");
    if (oldPac) oldPac.remove();

    // Ajouter Pac-Man à la nouvelle position
    const cells = document.querySelectorAll('#maze .cell');
    const index = state.pacMan.row * maze[0].length + state.pacMan.col;
    const targetCell = cells[index];

    if (!targetCell) return;

    const pacDiv = document.createElement('div');
    pacDiv.id = "pacman-container";
    pacDiv.innerHTML = `<img src="./jeu.png" alt="Pac-Man">`;

    targetCell.appendChild(pacDiv);
}

function engine(currentTime) {
    if (state.lastTime === 0) state.lastTime = currentTime;

    state.deltaTime = (currentTime - state.lastTime) / 1000;
    state.lastTime = currentTime;

    update();
    render();

    requestAnimationFrame(engine);
}

requestAnimationFrame(engine);