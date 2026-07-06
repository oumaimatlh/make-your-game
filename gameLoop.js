import { maze } from "./maze.js";
import { pacManRender, pacManUpdate } from "./pacMan.js";
import { ghostRender, ghostUpdate } from "./ghost.js";
import { renderHUD } from "./hud.js";
import { state } from "./store.js";

const startSound = new Audio("./assets/son.mp3");
startSound.preload = "auto";
startSound.volume = 0.5;
const FPS = 60;
const FRAME_DURATION = 1000 / FPS;
const MAX_ACCUMULATOR = FRAME_DURATION * 5;

const startScreen = document.getElementById("start-screen");
const pauseScreen = document.getElementById("pause-screen");
const playBtn = document.getElementById("play-btn");
const continueBtn = document.getElementById("continue-btn");
const pauseBtn = document.getElementById("pause-btn");
const gameOverScreen = document.getElementById("gameover-screen");
const restartBtn = document.getElementById("restart-btn");

function togglePause() {
  if (state.status === "playing") {
    state.status = "paused";
    pauseScreen.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  } else if (state.status === "paused") {
    state.status = "playing";
    pauseScreen.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  }
}

playBtn.addEventListener("click", () => {
  state.status = "playing";
  startScreen.classList.add("hidden");
  pauseBtn.classList.remove("hidden");

  startSound.currentTime = 0;
  startSound.play().catch(() => {});
});
continueBtn.addEventListener("click", () => togglePause());
pauseBtn.addEventListener("click", () => togglePause());
restartBtn.addEventListener("click", () => {
  hideGameOver();
  resetFullGame();
  state.status = "playing";
});

window.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
    if (state.status === "playing") {
      state.pacMan.direction = event.key;
    }
  }

  if (event.key === "Escape") {
    event.preventDefault();
    if (state.status === "playing" || state.status === "paused") {
      togglePause();
    }
  }
});

function showGameOver() {
  state.status = "gameover";
  gameOverScreen.classList.remove("hidden");
}

function hideGameOver() {
  gameOverScreen.classList.add("hidden");
}

function checkGhostCollisions() {
  if (state.hitDelay > 0) return;

  const crash = state.ghosts.some(
    (ghost) => ghost.row === state.pacMan.row && ghost.col === state.pacMan.col,
  );

  if (!crash) return;

  if (state.lives <= 1) {
    state.lives = 0;
    renderHUD();
    showGameOver();
    return;
  }

  state.lives = Math.max(0, state.lives - 1);
  renderHUD();
  state.hitDelay = 0.8;
}

function resetRound() {
  state.pacMan.row = 11;
  state.pacMan.col = 9;
  state.pacMan.direction = null;
  state.pacMan.moveTimer = 0;

  state.ghosts.forEach((ghost) => {
    ghost.row = ghost.startRow;
    ghost.col = ghost.startCol;
    ghost.direction = null;
    ghost.moveTimer = 0;
    ghost.startupTimer = ghost.startupDelay;
    ghost.hasLeftHouse = false;
  });
}

function resetFullGame() {
  state.score = 0;
  state.lives = 3;
  state.hitDelay = 0;
  state.lastTime = 0;
  resetRound();
  renderHUD();
}

function update() {
  if (state.status === "gameover") return;

  if (state.hitDelay > 0) {
    state.hitDelay = Math.max(0, state.hitDelay - state.deltaTime);

    if (state.hitDelay === 0) {
      resetRound();
    }

    return;
  }

  pacManUpdate();
  ghostUpdate();
  checkGhostCollisions();
}

function render() {
  pacManRender();
  ghostRender();
  renderHUD();
}

let accumulator = 0;

function engine(currentTime) {
  if (state.lastTime === 0) {
    state.lastTime = currentTime;
    requestAnimationFrame(engine);
    return;
  }

  let frameTime = currentTime - state.lastTime;
  state.lastTime = currentTime;

  if (frameTime > MAX_ACCUMULATOR) frameTime = MAX_ACCUMULATOR;

  accumulator += frameTime;

  while (accumulator >= FRAME_DURATION) {
    if (state.status === "playing") {
      state.deltaTime = FRAME_DURATION / 1000;
      update();
    }
    accumulator -= FRAME_DURATION;
  }

  if (state.status === "playing") {
    render();
  }

  requestAnimationFrame(engine);
}

requestAnimationFrame(engine);
