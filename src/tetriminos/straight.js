import Tetrimino from './tetrimino';

export default class Straight extends Tetrimino {
  constructor(board) {
    super(board);
    this.shape = [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.color = '#3399ff';
    this.y = 19;
  }

  resetCoordinates() {
    this.x = 3;
    this.y = 19;
  }
}
