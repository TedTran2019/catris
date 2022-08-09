import Game from '../game';

export default class Tetrimino {
  constructor(board) {
    this.shape = [];
    this.color = '';
    this.board = board;
    this.x = 3;
    this.y = 20;
  }

  drop() {
    this.y += Game.MOVE_SPEED;
    if (!this.isValidPositions()) {
      this.y -= Game.MOVE_SPEED;
      this.board.addTetrimino(this);
      return true;
    }
    return false;
  }

  resetCoordinates() {
    this.x = 3;
    this.y = 20;
  }

  // Minus 20 here to render within 0-20
  draw(ctx) {
    this.shape.forEach((row, y) => {
      row.forEach((block, x) => {
        if (block) {
          ctx.fillStyle = this.color;
          ctx.fillRect((this.x + x) * Game.BLOCK_SIZE, (this.y + y - 20) * Game.BLOCK_SIZE, Game.BLOCK_SIZE, Game.BLOCK_SIZE);
        }
      });
    });
  }

  // 0 - 2. 
  drawBlock(ctx, pos, sideSize) {
    this.shape.forEach((row, y) => {
      row.forEach((block, x) => {
        if (block) {
          ctx.fillStyle = this.color;
          let multiplier = pos * 5
          ctx.fillRect(x * sideSize,  (y + multiplier) * sideSize, sideSize, sideSize);
        }
      });
    });
  }

  drawLookAhead(ctx, aheadY) {
    const prevY = this.y;
    this.y = aheadY;
    this.shape.forEach((row, y) => {
      row.forEach((block, x) => {
        if (block) {
          ctx.fillStyle = 'grey';
          ctx.fillRect((this.x + x) * Game.BLOCK_SIZE, (this.y + y - 20) * Game.BLOCK_SIZE, Game.BLOCK_SIZE, Game.BLOCK_SIZE);
        }
      });
    });
    this.y = prevY;
  }

  moveLeft() {
    this.x -= Game.MOVE_SPEED;
    if (!this.isValidPositions()) {
      this.x += Game.MOVE_SPEED;
    }
  }

  moveRight() {
    this.x += Game.MOVE_SPEED;
    if (!this.isValidPositions()) {
      this.x -= Game.MOVE_SPEED;
    }
  }

  // Can't return out of Javascript enumerables
  isValidPositions() {
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x] === 1) {
          if (!this.board.isValidPos(this.x + x, this.y + y)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  softDrop() {
    this.y += Game.MOVE_SPEED;
    if (!this.isValidPositions()) {
      this.y -= Game.MOVE_SPEED;
    }
  }

  // Honestly, just hard coding the rotations would be way faster. No calculations.
  rotateRight() {
    const newShape = this.transpose(this.shape);
    const oldShape = this.shape;
    this.shape = newShape.map(row => row.reverse());
    if (!this.isValidPositions()) {
      let wallKickFailed = this.wallKick();
      if (wallKickFailed) {
        this.shape = oldShape;
      }
    }
  }

  rotateLeft() {
    this.shape.map(row => row.reverse()); // Mutates shape
    const oldShape = this.shape;
    this.shape = this.transpose(this.shape);
    if (!this.isValidPositions()) {
      let wallKickFailed = this.wallKick();
      if (wallKickFailed) {
        this.shape = oldShape;
        this.shape.map(row => row.reverse());
      }
    }
  }

  transpose(matrix) {
    const newShape = [];
    for (let y = 0; y < matrix.length; y++) {
      let row = [];
      for (let x =0; x < matrix[0].length; x++) {
        row.push(matrix[x][y]);
      }
      newShape.push(row);
    }
    return newShape;
  }

  // Simple wall kick algorithm. Try to check right/left are valid. 
  wallKick() {
    this.x += 1;
    if (this.isValidPositions()) {
      return false;
    } else {
      this.x -= 2;
    }
    if (this.isValidPositions()) {
      return false;
    }
    this.x += 1;
    return true;
  }
}
