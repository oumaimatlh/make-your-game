import { state } from "./store.js";

const scoreElement = document.getElementById("score-value");
const livesElement = document.getElementById("lives-value");
const timeElement = document.getElementById("time-value");

let prevScore = -1;
let prevLives = -1;
let prevTime = -1;

const lifeIconHTML = `
  <span class="life-icon">
    <svg viewBox="0 0 13 13">
      <path d="M4,0 H9 V1 H11 V2 H12 V4 H11 V5 H9 V6 H6 V7 H9 V8 H11 V9 H12 V11 H11 V12 H9 V13 H4 V12 H2 V11 H1 V9 H0 V4 H1 V2 H2 V1 H4 Z" fill="yellow" />
    </svg>
  </span>
`;

function formatTime(seconds) {
  const totalSeconds = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export function renderHUD() {
  if (state.score !== prevScore) {
    scoreElement.textContent = state.score;
    prevScore = state.score;
  }
  if (state.lives !== prevLives) {
    livesElement.innerHTML = Array.from({ length: Math.max(0, state.lives) })
      .map(() => lifeIconHTML)
      .join("");
    prevLives = state.lives;
  }
  if (state.timeRemaining !== prevTime) {
    timeElement.textContent = formatTime(state.timeRemaining);
    prevTime = state.timeRemaining;
  }
}
