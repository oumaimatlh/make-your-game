import { state } from "./store.js";

const scoreElement = document.getElementById("score-value");
const livesElement = document.getElementById("lives-value");

let prevScore = -1;
let prevLives = -1;

export function renderHUD() {
    if (state.score !== prevScore) {
        scoreElement.textContent = state.score;
        prevScore = state.score;
    }
    if (state.lives !== prevLives) {
        livesElement.textContent = state.lives;
        prevLives = state.lives;        
    }
}