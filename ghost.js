import { maze } from "./maze.js";
import { state } from "./store.js";

const ghostElements = new Map();

const ghostColors = {
  pink: "#ff1d87",
  cyan: "#00ffff",
  orange: "#ff583b",
};

function getGhostColor(color) {
  return ghostColors[color] || color || "#ff1d87";
}

function getDirectionDelta(direction) {
  switch (direction) {
    case "ArrowRight":
    case "right":
      return { row: 0, col: 1 };
    case "ArrowLeft":
    case "left":
      return { row: 0, col: -1 };
    case "ArrowUp":
    case "up":
      return { row: -1, col: 0 };
    case "ArrowDown":
    case "down":
      return { row: 1, col: 0 };
    default:
      return { row: 0, col: 0 };
  }
}

function canMoveTo(ghost, direction) {
  const delta = getDirectionDelta(direction);

  let newRow = ghost.row + delta.row;
  let newCol = ghost.col + delta.col;

  if (newCol < 0) newCol = maze[0].length - 1;
  else if (newCol >= maze[0].length) newCol = 0;

  if (newRow < 0 || newRow >= maze.length) return false;

  const tile = maze[newRow][newCol];

  if (tile === 1) return false;

  if (tile === 7 && ghost.hasLeftHouse) return false;

  return true;
}

function getOppositeDirection(direction) {
  switch (direction) {
    case "ArrowRight":
    case "right":
      return "left";
    case "ArrowLeft":
    case "left":
      return "right";
    case "ArrowUp":
    case "up":
      return "down";
    case "ArrowDown":
    case "down":
      return "up";
    default:
      return null;
  }
}

function chooseNextDirection(ghost) {
  const directions = ["up", "down", "left", "right"];
  const opposite = getOppositeDirection(ghost.direction);

  let validDirections = directions.filter((direction) =>
    canMoveTo(ghost, direction),
  );

  if (validDirections.length === 0) return null;
  if (validDirections.length > 1 && opposite) {
    validDirections = validDirections.filter(
      (direction) => direction !== opposite,
    );
  }

  if (
    ghost.direction &&
    validDirections.includes(ghost.direction) &&
    Math.random() < 0.7
  ) {
    return ghost.direction;
  }

  // 2 choose paths randomly
  return validDirections[Math.floor(Math.random() * validDirections.length)];
}

export function ghostUpdate() {
  state.ghosts.forEach((ghost) => {
    if (ghost.startupTimer < ghost.startupDelay) {
      ghost.startupTimer += state.deltaTime * 1000;
      return;
    }

    ghost.moveTimer += state.deltaTime * 1000;

    if (ghost.moveTimer < ghost.moveDelay) return;

    ghost.moveTimer = 0;

    if (!ghost.hasLeftHouse) {
      const isInHouse =
        ghost.row >= 8 && ghost.row <= 9 && ghost.col >= 8 && ghost.col <= 10;

      if (isInHouse) {
        ghost.direction = "up";
        ghost.row--;
        return;
      }

      ghost.hasLeftHouse = true;
      ghost.direction = "left";
    }

    const nextDirection = chooseNextDirection(ghost);

    if (!nextDirection) return;

    const delta = getDirectionDelta(nextDirection);

    let newRow = ghost.row + delta.row;
    let newCol = ghost.col + delta.col;

    if (newCol < 0) newCol = maze[0].length - 1;
    else if (newCol >= maze[0].length) newCol = 0;

    if (newRow < 0 || newRow >= maze.length || maze[newRow][newCol] === 1) {
      return;
    }

    ghost.direction = nextDirection;
    ghost.row = newRow;
    ghost.col = newCol;
  });
}

function getGhostElement(ghost) {
  if (!ghostElements.has(ghost)) {
    const ghostDiv = document.createElement("div");
    ghostDiv.className = "ghost-container";
    ghostDiv.style.width = "100%";
    ghostDiv.style.height = "100%";
    ghostDiv.innerHTML = `
      <svg viewBox="0 0 14 14" style="shape-rendering: crispEdges; width: 100%; height: 100%;">
        <path fill="${getGhostColor(ghost.color)}" d="M4,0h6v1h2v1h1v1h1v7h-1v1h-1v2h-1v-1h-1v-1h-1v1h-2v-1h-1v1h-1v1H2v-2H1v-1H0V3h1V2h1V1h2V0z"/>
        <rect x="2" y="3" width="3" height="4" fill="white"/>
        <rect x="8" y="3" width="3" height="4" fill="white"/>
        <rect x="2" y="4" width="2" height="2" fill="#2121ff"/>
        <rect x="8" y="4" width="2" height="2" fill="#2121ff"/>
      </svg>
    `;
    ghostElements.set(ghost, ghostDiv);
  }

  return ghostElements.get(ghost);
}

export function ghostRender() {
  const cells = document.querySelectorAll("#maze .cell");
  const columnCount = maze[0].length;

  state.ghosts.forEach((ghost) => {
    const index = ghost.row * columnCount + ghost.col;
    const targetCell = cells[index];

    if (!targetCell) return;

    const ghostDiv = getGhostElement(ghost);
    ghostDiv.style.transform = `scale(${ghost.size})`;
    ghostDiv.style.marginLeft = !ghost.hasLeftHouse ? "5px" : "0";

    if (ghostDiv.parentElement !== targetCell) {
      if (ghostDiv.parentElement) {
        ghostDiv.parentElement.removeChild(ghostDiv);
      }
      targetCell.appendChild(ghostDiv);
    }
  });
}
