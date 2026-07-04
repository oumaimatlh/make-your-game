import { maze } from "./maze.js";
import { state } from "./store.js";

const ghostColors = {
  pink: "#ff1d87",
  cyan: "#00ffff",
  orange: "#ff583b",
};

function getGhostColor(color) {
  return ghostColors[color] || color || "#ff1d87";
}

export function ghostUpdate() {}

export function ghostRender() {
  document
    .querySelectorAll("#maze .ghost-container")
    .forEach((ghost) => ghost.remove());

  const cells = document.querySelectorAll("#maze .cell");
  const columnCount = maze[0].length;

  state.ghosts.forEach((ghost) => {
    const index = ghost.row * columnCount + ghost.col;
    const targetCell = cells[index];

    if (!targetCell) return;

    const ghostDiv = document.createElement("div");
    ghostDiv.className = "ghost-container";

    ghostDiv.innerHTML = `
      <svg viewBox="0 0 14 14" style="shape-rendering: crispEdges; width: 100%; height: 100%;">
        <path fill="${getGhostColor(ghost.color)}" d="M4,0h6v1h2v1h1v1h1v7h-1v1h-1v2h-1v-1h-1v-1h-1v1h-2v-1h-1v1h-1v1H2v-2H1v-1H0V3h1V2h1V1h2V0z"/>
        <rect x="2" y="3" width="3" height="4" fill="white"/>
        <rect x="8" y="3" width="3" height="4" fill="white"/>
        <rect x="2" y="4" width="2" height="2" fill="#2121ff"/>
        <rect x="8" y="4" width="2" height="2" fill="#2121ff"/>
      </svg>
    `;

    targetCell.appendChild(ghostDiv);
  });
}
