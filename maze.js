// Architecture :THE MAZE PAC MAN

//Murs (walls) && PacMan && Paths &&& Dots && Fantomes(ghosts)
// 1 = mur, 0 = chemin, 2 = point (pac-dot)
export const initialMaze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 1],
  [1, 6, 1, 1, 1, 6, 1, 1, 6, 1, 6, 1, 1, 6, 1, 1, 1, 6, 1],
  [1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 1],
  [1, 6, 1, 1, 1, 6, 1, 6, 1, 1, 1, 6, 1, 6, 1, 1, 1, 6, 1],
  [1, 6, 1, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 1, 6, 1],
  [1, 6, 1, 6, 1, 1, 1, 1, 6, 1, 6, 1, 1, 1, 1, 6, 1, 6, 1],
  [1, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 1],
  [1, 1, 1, 6, 1, 6, 1, 1, 7, 7, 7, 1, 1, 6, 1, 6, 1, 1, 1],
  [6, 6, 6, 6, 1, 6, 1, 3, 0, 4, 0, 5, 1, 6, 1, 6, 6, 6, 6],
  [1, 1, 1, 6, 1, 6, 1, 1, 1, 1, 1, 1, 1, 6, 1, 6, 1, 1, 1],
  [1, 6, 6, 6, 6, 6, 6, 6, 6, 2, 6, 6, 6, 6, 6, 6, 6, 6, 1],
  [1, 6, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 6, 1],
  [1, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 1],
  [1, 1, 1, 6, 1, 6, 1, 6, 1, 1, 1, 6, 1, 6, 1, 6, 1, 1, 1],
  [1, 6, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 6, 1],
  [1, 6, 1, 1, 1, 1, 1, 1, 6, 1, 6, 1, 1, 1, 1, 1, 1, 6, 1],
  [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const maze = initialMaze.map((row) => [...row]);

export function restoreMaze() {
  maze.splice(0, maze.length, ...initialMaze.map((row) => [...row]));
}

export function rebuildMaze() {
  const mazeContainer = document.getElementById("maze");
  if (!mazeContainer) return;

  mazeContainer.innerHTML = "";

  maze.forEach((row) => {
    row.forEach((cell) => {
      const div = document.createElement("div");
      div.classList.add("cell");

      if (cell === 1) {
        div.classList.add("wall");
      } else if (cell === 2) {
        div.classList.add("path");
        div.classList.add("pacman-cell");
      } else if (cell === 7) {
        div.classList.add("door");
      } else if (cell === 6) {
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
      } else {
        div.classList.add("path");
      }

      mazeContainer.appendChild(div);
    });
  });
}

rebuildMaze();
