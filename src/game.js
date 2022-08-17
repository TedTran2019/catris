import Board from './board';
import PieceManager from './pieceManager';

export default class Game {
  constructor(customEvents) {
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
    this.customEvents = customEvents;
    this.dropRate = 60;
  }

  step() {
    let isGameOver = this.pieceManager.move(this.customEvents, this.dropRate);
    if (isGameOver) {
      window.dispatchEvent(this.customEvents.gameOver);
      return true 
    };
    let lines = this.board.clearRows();
    this.calculateScore(lines);
    if (lines > 0) { window.dispatchEvent(this.customEvents.lineClear) };
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
    this.dropRate = 60 - (this.level * 5);
    this.showScore();
  }

  showScore() {
    this.scoreHolders[0].textContent = this.score;
    this.scoreHolders[1].textContent = this.score;
    this.levelHolder.textContent = this.level;
    this.linesHolder.textContent = this.lines;
  }
}

Game.DIM_X = 400;
Game.DIM_Y = Game.DIM_X * 2;
Game.ROWS = 40;
Game.COLS = 10;
Game.BLOCK_SIZE = Game.DIM_X / Game.COLS;
Game.MOVE_SPEED = 1;
Game.LINE_SCORE = [40, 100, 300, 1200];
