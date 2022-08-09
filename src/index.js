import GameView from './gameView.js'
import Game from './game.js';

window.addEventListener('DOMContentLoaded', event => {
  const canvas = document.getElementById('game-canvas');
  const holdCanvas = document.getElementById('hold-canvas');
  const nextCanvas = document.getElementById('next-canvas');
  const ctx = canvas.getContext('2d');
  const holdCtx = holdCanvas.getContext('2d');
  const nextCtx = nextCanvas.getContext('2d');
  const bgm = document.createElement('audio');
  bgm.setAttribute('src', '../src/sound/catris.m4a');
  bgm.playbackRate = 1.5;
  const game = new Game();
  const gv = new GameView(game, ctx, holdCtx, nextCtx, bgm);
  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    play.style.display = 'none';
    document.querySelector('.play-holder').style.display = 'none';
    bgm.play();
    gv.start();
  })
})
