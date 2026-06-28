var state = {
    pacMan: {
        row: 15,
        col: 11,
        direction: null,
        nextDirection: '',
        moveTimer: 0,
        moveDelay: 80
    },
    fantome: {
        green: { row: 12, col: 9, direction: '', nextDirection: '' },
        red: { row: 12, col: 11, direction: '', nextDirection: '' },
        pink: { row: 12, col: 13, direction: '', nextDirection: '' }
    },
    score: 0,
    lives: 3,
    running: true,
    paused: false,
    gameOver: false,
    win: false,
    lastTime: 0,
    deltaTime: 0,
    frameCount: 0
};

