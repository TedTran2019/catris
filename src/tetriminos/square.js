import Tetrimino from './tetrimino';
import CatBlockYellow from '../images/catblock-yellow.png';

export default class Square extends Tetrimino {
  constructor(board) {
    super(board);
    this.shape = [
      [1, 1],
      [1, 1],
    ];
    this.color = 'yellow';
    this.image.src = CatBlockYellow;
    this.x = 4;
  }

  resetCoordinates() {
    this.x = 4;
    this.y = 20;
  }
}
