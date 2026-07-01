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

    // Gestion des tunnels (bords de l'écran)
    if (newCol < 0) {
        newCol = maze[0].length - 1;
    }
    else if (newCol >= maze[0].length) {
        newCol = 0;
    }

    if (newRow < 0 || newRow >= maze.length) {
        return;
    }

    // Collision murs (1) et porte des fantômes (7)
    if (maze[newRow][newCol] === 1 || maze[newRow][newCol] === 7) {
        return;
    }

    state.pacMan.row = newRow;
    state.pacMan.col = newCol;

    // Manger un Pac-Dot (6)
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
    // Supprime l'ancien Pac-Man s'il existe
    const oldPac = document.getElementById("pacman-container");
    if (oldPac) oldPac.remove();

    const cells = document.querySelectorAll('#maze .cell');
    const index = state.pacMan.row * maze[0].length + state.pacMan.col;
    const targetCell = cells[index];

    if (!targetCell) return;

    // Calcul de l'orientation
    let transformStyle = "rotate(0deg)"; 
    switch (state.pacMan.direction) {
        case "ArrowRight": 
            transformStyle = "rotate(0deg)"; 
            break;
        case "ArrowDown": 
            transformStyle = "rotate(90deg)"; 
            break;
        case "ArrowLeft": 
            transformStyle = "scaleX(-1)"; // Retourne le pixel art vers la gauche
            break;
        case "ArrowUp": 
            transformStyle = "rotate(-90deg)"; 
            break;
    }

    // Création du conteneur de Pac-Man
    const pacDiv = document.createElement('div');
    pacDiv.id = "pacman-container";
    
    // APPLICATION DE LA ROTATION / DIRECTION
    pacDiv.style.transform = transformStyle;
    pacDiv.style.width = "100%";
    pacDiv.style.height = "100%";
    
    // Injection du SVG Pixel Art (Correction de la faute de syntaxe)
    pacDiv.innerHTML = `
    <svg viewBox="0 0 14 13" width="100%" height="100%" style="shape-rendering: crispEdges;">
        <!-- Corps en pixel art conforme à Screenshot from 2026-07-01 16-57-19.png -->
        <path d="
            M 4,0 H 9 
            V 1 H 11 
            V 2 H 12 
            V 4 H 11 
            V 5 H 9 
            V 6 H 6 
            V 7 H 9 
            V 8 H 11 
            V 9 H 12 
            V 11 H 11 
            V 12 H 9 
            V 13 H 4 
            V 12 H 2 
            V 11 H 1 
            V 9 H 0 
            V 4 H 1 
            V 2 H 2 
            V 1 H 4 
            Z
        " fill="#FDEA22" stroke="#000" stroke-width="0.5" stroke-linejoin="miter" />
    </svg>
    `;

    targetCell.appendChild(pacDiv);
}

export { pacManRender, pacManUpdate };