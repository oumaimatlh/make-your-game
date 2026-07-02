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
[1,1,1,6,1,6,1,1,7,7,7,1,1,6,1,6,1,1,1],
[6,6,6,6,1,6,1,3,0,4,0,5,1,6,1,6,6,6,6],
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
            
     pacman.innerHTML = `
    <svg viewBox="0 0 11 11" width="100%" height="100%" style="shape-rendering: crispEdges;">
        <!-- Corps en pixel art avec contour noir -->
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
            div.appendChild(pacman);
        }

        else if (cell === 3 || cell === 4 || cell === 5) {
            div.classList.add("path");
            div.classList.add("ghost-cell");

            const ghost = document.createElement("div");
            ghost.className = "ghost-container";

            
            const ghostColor = 
                cell === 3 ? "#ff1d87" : 
                cell === 4 ? "#00ffff" :
                             "#ff583b"; 

            ghost.innerHTML = `
                <svg viewBox="0 0 14 14" style="shape-rendering: crispEdges; width: 100%; height: 100%;">
                    <!-- Corps pixelisé du fantôme -->
                    <path fill="${ghostColor}" d="M4,0h6v1h2v1h1v1h1v7h-1v1h-1v2h-1v-1h-1v-1h-1v1h-2v-1h-1v1h-1v1H2v-2H1v-1H0V3h1V2h1V1h2V0z"/>
                    
                    <!-- Blanc des yeux -->
                    <rect x="2" y="3" width="3" height="4" fill="white"/>
                    <rect x="8" y="3" width="3" height="4" fill="white"/>
                    
                    <!-- Pupilles bleues (regard vers la gauche) -->
                    <rect x="2" y="4" width="2" height="2" fill="#2121ff"/>
                    <rect x="8" y="4" width="2" height="2" fill="#2121ff"/>
                </svg>
            `;
            div.appendChild(ghost);
        }
        else if (cell === 7 ){
        
            div.classList.add('door')

        }

        else if (cell === 6) {
            div.classList.add("path");
            div.classList.add("dot-cell");

            const dot = document.createElement("div");
            dot.className = "pac-dot";
            dot.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="6"  stroke-width="1.5"/>
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