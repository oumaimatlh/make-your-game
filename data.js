const walls = [];
document.querySelectorAll(".maze").forEach(path => {
    walls.push(path.getBBox());
})

const pacMan = document.getElementById('PacMan')

const pacWidth = parseFloat(pacMan.getAttribute('width'))
const pacHeight = parseFloat(pacMan.getAttribute('height'))

const SVG_WIDTH = 1132
const SVG_HEIGHT = 1144

const STEP = 20;

let positionPacMan = {
    x: parseFloat(pacMan.getAttribute('x')),
    y: parseFloat(pacMan.getAttribute('y'))
};

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function movePacMan(dx, dy) {
    const newX = clamp(positionPacMan.x + dx, 0, SVG_WIDTH - pacWidth);
    const newY = clamp(positionPacMan.y + dy, 0, SVG_HEIGHT - pacHeight);
    positionPacMan.x = newX;
    positionPacMan.y = newY;
    pacMan.setAttribute('x', positionPacMan.x);
    pacMan.setAttribute('y', positionPacMan.y);
}


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            movePacMan(STEP, 0);
            break;
        case 'ArrowLeft':
            movePacMan(-STEP, 0);
            break;
        case 'ArrowUp':
            movePacMan(0, -STEP);
            break;
        case 'ArrowDown':
            movePacMan(0, STEP);
            break;
    }
});

