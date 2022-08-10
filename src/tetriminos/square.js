import Tetrimino from './tetrimino';

export default class Square extends Tetrimino {
  constructor(board) {
    super(board);
    this.shape = [
      [1, 1],
      [1, 1],
    ];
    this.color = 'yellow';
    this.image.src = './images/catblock-yellow.png';
    this.x = 4;
  }

  resetCoordinates() {
    this.x = 4;
    this.y = 20;
  }
}
