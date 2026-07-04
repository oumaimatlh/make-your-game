export var state = {
  pacMan: {
    row: 11,
    col: 9,
    direction: null,
    moveTimer: 0,
    moveDelay: 110,
    },
    
  ghosts: [
    {
      row: 9,
      col: 9,
      direction: null,
      color: "pink",
      moveTimer: 0,
      moveDelay: 150,
      startupTimer: 0,
      startupDelay: 3000,
      hasLeftHouse: false,
      size: 1,
    },
  ],

  score: 0,
  lives: 3,
  lastTime: 0,
  deltaTime: 0,
  status: "start",
};
