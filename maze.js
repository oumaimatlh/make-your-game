// Architecture :THE MAZE PAC MAN 

//Murs (walls) && PacMan && Paths &&& Dots && Fantomes(ghosts)
// 1 = mur, 0 = chemin, 2 = point (pac-dot)
export const maze = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,6,6,6,6,6,6,6,6,1,6,6,6,6,6,6,6,6,1],
[1,6,1,1,1,6,1,1,6,1,6,1,1,6,1,1,1,6,1],
[1,6,6,6,6,6,1,6,6,6,6,6,1,6,6,6,6,6,1],
[1,6,1,1,1,6,1,6,1,1,1,6,1,6,1,1,1,6,1],
[1,6,1,6,6,6,6,6,6,1,6,6,6,6,6,6,1,6,1],
[1,6,1,6,1,1,1,1,6,1,6,1,1,1,1,6,1,6,1],
[1,6,6,6,1,6,6,6,6,6,6,6,6,6,1,6,6,6,1],
[1,1,1,6,1,6,1,1,6,6,6,1,1,6,1,6,1,1,1],
[6,6,6,6,1,6,1,3,6,4,6,5,1,6,1,6,6,6,6],
[1,1,1,6,1,6,1,1,1,1,1,1,1,6,1,6,1,1,1],
[1,6,6,6,6,6,6,6,6,2,6,6,6,6,6,6,6,6,1],
[1,6,1,1,1,6,1,1,1,1,1,1,1,6,1,1,1,6,1],
[1,6,6,6,1,6,6,6,6,6,6,6,6,6,1,6,6,6,1],
[1,1,1,6,1,6,1,6,1,1,1,6,1,6,1,6,1,1,1],
[1,6,6,6,6,6,1,6,6,1,6,6,1,6,6,6,6,6,1],
[1,6,1,1,1,1,1,1,6,1,6,1,1,1,1,1,1,6,1],
[1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

const mazeContainer = document.getElementById("maze");

maze.forEach(row => {
    row.forEach(cell => {

  const div = document.createElement("div");

div.classList.add("cell");

if (cell === 1) {
    div.classList.add("wall");
}

else if (cell === 2) {
    div.classList.add("path");
    div.classList.add("pacman-cell");

    const pacman = document.createElement("div");
    pacman.id = "pacman-container";
    pacman.innerHTML = `<img src="./jeu.png">`;

    div.appendChild(pacman);
}

else if (cell === 3 || cell === 4 || cell === 5) {

    div.classList.add("path");
    div.classList.add("ghost-cell");

    const ghost = document.createElement("div");
    ghost.className = "ghost-container";

    // Définir la couleur du fantôme
    // 3 = Rose (Pinky), 4 = Bleu (Inky), 5 = Vert (Funky)
    const ghostColor = 
        cell === 3 ? "#ff0090" : 
        cell === 4 ? "#00FFFF" : 
                     "#ef661c";

    // Génération du fantôme en SVG
    ghost.innerHTML = `
        <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <!-- Corps du fantôme -->
            <path fill="${ghostColor}" d="M0,14 V7 A7,7 0 0,1 14,7 V14 L11.5,12 L9,14 L7,12 L5,14 L2.5,12 L0,14 Z" />
            
            <!-- Fond des yeux (blanc) -->
            <circle cx="4" cy="5.5" r="2.2" fill="white" />
            <circle cx="10" cy="5.5" r="2.2" fill="white" />
            
            <!-- Pupilles (bleues) -->
            <circle cx="3.5" cy="5.5" r="1.2" fill="blue" />
            <circle cx="9.5" cy="5.5" r="1.2" fill="blue" />
        </svg>
    `;

    div.appendChild(ghost);
}
else if (cell === 6) {

    div.classList.add("path");
    div.classList.add("dot-cell");

    const dot = document.createElement("div");
    dot.className = "pac-dot";

    dot.innerHTML = `
        <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="6"
                fill="#FFEB3B"
                stroke="#FFD700"
                stroke-width="1.5"/>
        </svg>
    `;

    div.appendChild(dot);
}

else {
    div.classList.add("path");
}

mazeContainer.appendChild(div);

    });
});