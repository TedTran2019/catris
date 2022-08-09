import Tetrimino from './tetrimino';

export default class L extends Tetrimino {
  constructor(board) {
    super(board);
    this.shape = [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ];
    this.color = 'orange';
  }
}
