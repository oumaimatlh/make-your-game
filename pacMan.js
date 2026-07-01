import { maze } from "./maze.js";
import { state } from "./store.js";

function pacManUpdate() {
    if (!state.pacMan.direction) return;

    state.pacMan.moveTimer += state.deltaTime * 1000;
    if (state.pacMan.moveTimer < state.pacMan.moveDelay) return;

    state.pacMan.moveTimer = 0;

    let newRow = state.pacMan.row;
    let newCol = state.pacMan.col;

    switch (state.pacMan.direction) {
        case "ArrowRight": newCol++; break;
        case "ArrowLeft": newCol--; break;
        case "ArrowUp": newRow--; break;
        case "ArrowDown": newRow++; break;
    }

  
if (newCol < 0) {
    newCol = maze[0].length - 1;
}
else if (newCol >= maze[0].length) {
    newCol = 0;
}

if (newRow < 0 || newRow >= maze.length) {
    return;
}

if (maze[newRow][newCol] === 1 || maze[newRow][newCol] === 7) {
    return;
}

    state.pacMan.row = newRow;
    state.pacMan.col = newCol;

    if (maze[newRow][newCol] === 6 ){
        maze[newRow][newCol] = 0;
        state.score += 10;

        const cells = document.querySelectorAll('#maze .cell');
        const index = newRow * maze[0].length + newCol;
        const cell = cells[index];

        const dot = cell.querySelector('.pac-dot');
        if (dot) dot.remove();
    }
}

function pacManRender() {
    const oldPac = document.getElementById("pacman-container");
    if (oldPac) oldPac.remove();

    const cells = document.querySelectorAll('#maze .cell');
    const index = state.pacMan.row * maze[0].length + state.pacMan.col;
    const targetCell = cells[index];

    if (!targetCell) return;

    let transformStyle = "rotate(0deg)"; 
    switch (state.pacMan.direction) {
        case "ArrowRight": 
            transformStyle = "rotate(0deg)"; 
            break;
        case "ArrowDown": 
            transformStyle = "rotate(90deg)"; 
            break;
        case "ArrowLeft": 
            transformStyle = "scaleX(-1)"; 
            break;
        case "ArrowUp": 
            transformStyle = "rotate(-90deg)"; 
            break;
    }

    const pacDiv = document.createElement('div');
    pacDiv.id = "pacman-container";
    
    pacDiv.innerHTML = `<img src="./jeu.png" alt="Pac-Man" style="transform: ${transformStyle}; width: 100%; height: 100%; transition: transform 0.1s ease-in-out;">`;

    targetCell.appendChild(pacDiv);
}
export { pacManRender, pacManUpdate }