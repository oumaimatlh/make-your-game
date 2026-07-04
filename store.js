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
      col: 7,
      direction: "left",
      color: "pink",
      moveTimer: 0,
      moveDelay: 150,
    },
  ],

  score: 0,
  lives: 3,
  lastTime: 0,
  deltaTime: 0,
  status: "start",
};