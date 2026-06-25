import { maze } from "./maze.js";

var statePacMan = {
    row: 15,
    col: 11
};

let direction = null;

window.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        direction = event.key;
    }
});


setInterval(() => {

    if (!direction) return;

    let newRow = statePacMan.row;
    let newCol = statePacMan.col;

    switch (direction) {
        case "ArrowRight":
            newCol++;
            break;

        case "ArrowLeft":
            newCol--;
            break;

        case "ArrowUp":
            newRow--;
            break;

        case "ArrowDown":
            newRow++;
            break;
    }

    // Out of Range 
    if (
        newRow < 0 ||
        newRow >= maze.length ||
        newCol < 0 ||
        newCol >= maze[0].length
    ) {
        return;
    }

    // Mur Collision ,,
    if (maze[newRow][newCol] === 1) {
        direction = null;
        return;
    }

    const rows = document.getElementsByTagName('tr');
    const currentCell = rows[statePacMan.row].children[statePacMan.col];
    const nextCell = rows[newRow].children[newCol];

    const pacmanHTML = currentCell.innerHTML;

    currentCell.innerHTML = '';
    currentCell.id = '';

    nextCell.innerHTML = pacmanHTML;
    nextCell.id = 'pacman-container';

    statePacMan.row = newRow;
    statePacMan.col = newCol;

    if (nextCell.classList.contains('dot-cell')) {
        nextCell.classList.remove('dot-cell');

        const dot = nextCell.querySelector('.pac-dot');
        if (dot) dot.remove();
    }

}, 100);