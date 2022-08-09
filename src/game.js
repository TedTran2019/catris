import Board from './board';
import PieceManager from './pieceManager';

export default class Game {
  constructor() {
   this.rows = Game.ROWS;
   this.cols = Game.COLS;
   this.dimX = Game.DIM_X;
   this.dimY = Game.DIM_Y;
   this.blockSize = Game.BLOCK_SIZE;
   this.board = new Board(this.cols, this.rows, this.blockSize);
   this.pieceManager = new PieceManager(this.board);
   this.score = 0;
   this.level = 0;
   this.lines = 0;
  this.scoreHolders = document.getElementsByClassName('score-number');
  this.levelHolder = document.querySelector('.level-number');
  this.linesHolder = document.querySelector('.lines-number');
  this.showScore();
  }

  step() {
    let isGameOver = this.pieceManager.move();
    if (isGameOver) {return true };
    this.calculateScore(this.board.clearRows());
    return false;
  }

  draw(ctx, holdCtx, nextCtx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    this.board.draw(ctx);
    this.pieceManager.draw(ctx, holdCtx, nextCtx, Game.BLOCK_SIZE);
  }

  calculateScore(lines) {
    if (lines == 0) { 
      return 0;
    }
    this.score += Game.LINE_SCORE[lines - 1] * (this.level + 1);
    this.lines += lines;
    this.level = Math.floor(this.lines / 10);
    this.showScore();
  }

  showScore() {
    this.scoreHolders[0].textContent = this.score;
    this.scoreHolders[1].textContent = this.score;
    this.levelHolder.textContent = this.level;
    this.linesHolder.textContent = this.lines;
  }
}

Game.DIM_X = 450;
Game.DIM_Y = 900;
Game.ROWS = 40;
Game.COLS = 10;
Game.BLOCK_SIZE = 45;
Game.MOVE_SPEED = 1;
Game.LINE_SCORE = [40, 100, 300, 1200];
