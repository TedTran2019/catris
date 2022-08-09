import Game from './game.js';

export default class GameView {
  constructor(game, ctx, holdCtx, nextCtx, bgm) {
    this.game = game;
    this.ctx = ctx;
    this.holdCtx = holdCtx;
    this.nextCtx = nextCtx;
    this.paused = false;
    this.isGameOver = false;
    this.bgm = bgm;
    this.modal = document.querySelector('.modal');
    this.pause = document.querySelector('.pause');
    this.gameOver = document.querySelector('.game-over');
    document.querySelector('#restart').addEventListener('click', () => {
      this.restart();
    })
  }
  
  restart() {
    this.game = new Game();
    this.isGameOver = false;
    this.gameOverFunc();
    this.bgm.play();
    this.animate();
  }

  start() {
    this.bindKeyHandlers();
    this.repeatMusic();
    this.animate();
  }

  repeatMusic() {
    this.bgm.addEventListener('ended', () => {
      this.bgm.currentTime = 0;
      this.bgm.play();
    })
  }

  animate() {
    requestAnimationFrame(() => {
      if (this.isGameOver) { 
        this.gameOverFunc();
        return 
      };
      if (!this.paused) {
        this.isGameOver = this.game.step();
        this.game.draw(this.ctx, this.holdCtx, this.nextCtx);
      }
      this.animate();
    })
  }

  bindKeyHandlers() {
    window.addEventListener('keydown', (event) => {
      console.log(event.code);
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyX':
        case 'KeyW':
          this.game.pieceManager.rotateRight();
          break;
        case 'Space':
          this.game.pieceManager.hardDropIt();
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
        case 'KeyC':
          this.game.pieceManager.holdTetrimino();
          break;
        case 'ControlLeft':
        case 'ControlRight':
        case 'KeyZ':
          this.game.pieceManager.rotateLeft();
          break;
        case 'F1':
        case 'KeyP':
          this.togglePause();
          break;
        case 'Escape':
          this.setGameOver();
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.game.pieceManager.moveLeft();
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.game.pieceManager.moveRight();
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.game.pieceManager.softDrop();
          break;
      }
    });
  }

  togglePause() {
    this.paused = !this.paused;
    this.modal.classList.toggle('active');
    if (this.pause.style.display !== 'block') {
      this.pause.style.setProperty('display', 'block');
    } else {
      this.pause.style.setProperty('display', 'none'); 
    }
    this.bgm.paused ? this.bgm.play() : this.bgm.pause();
  }

  gameOverFunc() {
    this.modal.classList.toggle('active');
    if (this.gameOver.style.display !== 'block') {
      this.gameOver.style.setProperty('display', 'block');
    } else {
      this.gameOver.style.setProperty('display', 'none');
    }
    this.bgm.pause();
    this.bgm.currentTime = 0;
  }

  setGameOver() {
    this.isGameOver = true;
  }
}
