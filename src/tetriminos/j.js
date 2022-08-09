import Tetrimino from './tetrimino';

export default class J extends Tetrimino {
  constructor(board) {
    super(board);
    this.shape = [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    this.color = 'blue';
  }
}
