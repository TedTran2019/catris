import Straight from './tetriminos/straight';
import Square from './tetriminos/square';
import T from './tetriminos/t';
import J from './tetriminos/j';
import L from './tetriminos/l';
import S from './tetriminos/s';
import Z from './tetriminos/z';

export default class PieceManager {
  constructor(board) {
    this.board = board;
    this.current = this.randomPiece();
    this.dropCount = 0;
    this.hold = null;
    this.holdCount = 0;
    this.next = [this.randomPiece(), this.randomPiece(), this.randomPiece()];
    this.lookAhead = this.calculateLookAhead();
    this.hardDrop = false;
  }

  static pieces = [Straight, Square, T, J, L, S, Z];

  randomPiece() {
    const rand = Math.floor(Math.random() * PieceManager.pieces.length);
    return new PieceManager.pieces[rand](this.board);
  }

  // createPiece() {
  //   this.current = this.next.shift();
  //   this.next.push(this.randomPiece());
  //   if (!this.current.isValidPositions()) {
  //     this.current.y -= 1;
  //   }
  //   if (!this.current.isValidPositions()) {
  //     this.current = null;
  //   }
  // }

  createPiece() {
    this.current = this.isValidPiece(this.next[0]);
    if (this.current) {
      this.next.shift();
      this.next.push(this.randomPiece());
    }
  }

  isValidPiece(piece) {
    if (!piece.isValidPositions()) {
      piece.y -= 1;
    } else {
      return piece;
    }
    if (!piece.isValidPositions()) {
      piece.y += 1;
      return null;
    } else {
      return piece;
    }
  }

  move() {
    if (this.dropCount === 60 || this.hardDrop) {
      if (this.hardDrop) {
        this.current.y = this.lookAhead;
        this.hardDrop = false;
      }
      let tetriminoPlaced = this.current.drop();
      if (tetriminoPlaced) {
        this.createPiece();
        this.holdCount = 0;
        if (this.current === null) {
          return true;
        }
      }
      this.dropCount = 0;
    }
    this.lookAhead = this.calculateLookAhead();
    this.dropCount += 1;
    return false;
  }

  // The current with the final possible y value
  calculateLookAhead() {
    let preyY = this.current.y;
    while (this.current.isValidPositions()) {
      this.current.y += 1
    }
    this.current.y -= 1;
    let tmp = this.current.y;
    this.current.y = preyY;
    return tmp;
  }

  draw(ctx, holdCtx, nextCtx, sideBlockSize) {
    if (this.current) {
      this.current.drawLookAhead(ctx, this.lookAhead);
      this.current.draw(ctx);
    }
    this.drawHoldContainer(holdCtx);
    if (this.hold) {
      this.hold.drawBlock(holdCtx, 0, sideBlockSize);
    }
    this.drawNextContainer(nextCtx);
    this.next.forEach((nextPiece, index) => {
      nextPiece.drawBlock(nextCtx, index, sideBlockSize);
    })
  }

  // Fix magic numbers later
  drawNextContainer(ctx) {
    ctx.clearRect(0, 0, 180, 675);
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 4; x++) {
        ctx.strokeStyle = 'green';
        ctx.strokeRect(x * 45, y * 45, 45, 45);
      }
    }
  }

  drawHoldContainer(ctx) {
    ctx.clearRect(0, 0, 180, 180);
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        ctx.strokeStyle = 'green';
        ctx.strokeRect(x * 45, y * 45, 45, 45);
      }
    }
  }

  // drawHoldContainer(ctx) {
  //   ctx.fillStyle = 'black';
  //   ctx.fillRect(0, 0, 150, 150);
  // }

  holdTetrimino() {
    if (this.holdCount === 0) {
      if (this.hold === null) {
        this.enterHold(this.current);
        this.createPiece();
      } else {
        if (this.isValidPiece(this.hold)) {
          const temp = this.current;
          this.current = this.hold;
          this.enterHold(temp);
        } else {
          return;
        }
      }
      this.holdCount += 1;
    }
  }

  enterHold(piece) {
    piece.resetCoordinates();
    this.hold = piece;
  }

  moveLeft() {
    this.current.moveLeft();
  }

  moveRight() {
    this.current.moveRight();
  }

  softDrop() {
    this.current.softDrop();
  }

  rotateRight() {
    this.current.rotateRight();
  }

  rotateLeft() {
    this.current.rotateLeft();
  }

  // This locks!
  hardDropIt() {
    this.hardDrop = true;
  }
}
