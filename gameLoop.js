import { maze } from "./maze.js";
import { pacManRender, pacManUpdate } from "./pacMan.js";
import { state } from "./store.js";


const startSound = new Audio("./assets/son.mp3");
startSound.preload = "auto";
startSound.volume = 0.5;
const FPS = 60;
const FRAME_DURATION = 1000 / FPS; 
const MAX_ACCUMULATOR = FRAME_DURATION * 5; 

const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const playBtn = document.getElementById('play-btn');
const continueBtn = document.getElementById('continue-btn');
const pauseBtn = document.getElementById('pause-btn');

function togglePause() {
    if (state.status === 'playing') {
        state.status = 'paused';
        pauseScreen.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
    } else if (state.status === 'paused') {
        state.status = 'playing';
        pauseScreen.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
    }
}

playBtn.addEventListener('click', () => {
    state.status = 'playing';
    startScreen.classList.add('hidden');
    pauseBtn.classList.remove('hidden');

    startSound.currentTime = 0;
    startSound.play().catch(() => {});
});
continueBtn.addEventListener('click', () => togglePause());
pauseBtn.addEventListener('click', () => togglePause());

window.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        if (state.status === 'playing') {
            state.pacMan.direction = event.key;
        }
    }

    if (event.key === 'Escape') {
        event.preventDefault();
        if (state.status === 'playing' || state.status === 'paused') {
            togglePause();
        }
    }
});

function update() {
    pacManUpdate();
}

function render() {
    pacManRender();
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
        if (state.status === 'playing') {
            state.deltaTime = FRAME_DURATION / 1000; 
            update();
        }
        accumulator -= FRAME_DURATION;
    }

    if (state.status === 'playing') {
        render();
    }

    requestAnimationFrame(engine);
}

requestAnimationFrame(engine);