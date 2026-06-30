// import { maze } from "./maze.js";

// // STATE
// var state = {
//     pacMan: {
//         row: 15,
//         col: 11,
//         direction: null,
//         nextDirection: '',
//         moveTimer: 0,
//         moveDelay: 80
//     },
//     fantome: {
//         green: { row: 12, col: 9, direction: '', nextDirection: '' },
//         red: { row: 12, col: 11, direction: '', nextDirection: '' },
//         pink: { row: 12, col: 13, direction: '', nextDirection: '' }
//     },
//     score: 0,
//     lives: 3,
//     running: true,
//     paused: false,
//     gameOver: false,
//     win: false,
//    lastTime: 0,
//     deltaTime: 0,
//     frameCount: 0,
//     fps: 0,
//     fpsTimer: 0,
// };


// window.addEventListener('keydown', (event) => {
//     if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
//         event.preventDefault();
//         state.pacMan.direction = event.key;
//     }
// });


// function update() {

//     if (!state.pacMan.direction) return;

//     state.pacMan.moveTimer += state.deltaTime * 1000;

//     if (state.pacMan.moveTimer < state.pacMan.moveDelay) return;

//     state.pacMan.moveTimer = 0;

//     let newRow = state.pacMan.row;
//     let newCol = state.pacMan.col;

//     switch (state.pacMan.direction) {
//         case "ArrowRight":
//             newCol++;
//             break;
//         case "ArrowLeft":
//             newCol--;
//             break;
//         case "ArrowUp":
//             newRow--;
//             break;
//         case "ArrowDown":
//             newRow++;
//             break;
//     }

//     if (
//         newRow < 0 ||
//         newRow >= maze.length ||
//         newCol < 0 ||
//         newCol >= maze[0].length
//     ) return;

//     if (maze[newRow][newCol] === 1) return;

//     state.pacMan.row = newRow;
//     state.pacMan.col = newCol;
// }


// function render() {

//     const rows = document.getElementsByTagName('tr');

//     const old = document.querySelector('#pacman-container');
//     if (old) {
//         old.innerHTML = '';
//         old.id = '';
//     }

//     const cell = rows[state.pacMan.row].children[state.pacMan.col];

//     const pacDiv = document.createElement('div');
//     pacDiv.innerHTML = `<img src="./jeu.png" alt="Pac-Man">`;

//     cell.innerHTML = '';
//     cell.appendChild(pacDiv);
//     cell.id = "pacman-container";
// }


// function engine(currentTime) {

//     if (state.lastTime === 0) {
//         state.lastTime = currentTime;
//     }

//     state.deltaTime = (currentTime - state.lastTime) / 1000;
//     state.lastTime = currentTime;

//     // Gestion FPS
//     state.frameCount++;
//     state.fpsTimer += state.deltaTime;

//     if (state.fpsTimer >= 1) {
//         state.fps = state.frameCount;

//         console.clear();
//         console.log("FPS :", state.fps);

//         state.frameCount = 0;
//         state.fpsTimer = 0;
//     }

//     if (!state.paused && !state.gameOver) {
//         update();
//         render();
//     }

//     requestAnimationFrame(engine);
// }
// requestAnimationFrame(engine);

// /*
//     FPS ; Frame per Second

// À chaque frame (image), le navigateur :

// met à jour le jeu (update)
// redessine le jeu (render)
// */