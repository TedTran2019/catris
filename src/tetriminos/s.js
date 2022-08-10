import Tetrimino from './tetrimino';
import CatBlockGreen from '../images/catblock-green.png';

export default class S extends Tetrimino {
  constructor(board) {
    super(board);
    this.shape = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];
    this.color = 'green';
    this.image.src = CatBlockGreen;
  }
}
