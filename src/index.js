import GameView from './gameView.js'
import Game from './game.js';
import './css/style.scss';
import './css/reset.scss';
// function importAll(r) {
//   r.keys().forEach(r)
// }

// Directory -> use Subdirectories? -> regExp
// importAll(require.context('./images/', false, /\.png$/));
// importAll(require.context('./sound/', false, /\.m4a$/));
import BGM_SRC from './sound/catris.m4a';

window.addEventListener('DOMContentLoaded', event => {
  const canvas = document.getElementById('game-canvas');
  const holdCanvas = document.getElementById('hold-canvas');
  const nextCanvas = document.getElementById('next-canvas');
  const ctx = canvas.getContext('2d');
  const holdCtx = holdCanvas.getContext('2d');
  const nextCtx = nextCanvas.getContext('2d');
  const bgm = document.createElement('audio');
  const customEvents = createCustomEvents();
  bgm.setAttribute('src', BGM_SRC);
  bgm.volume = .8;
  bgm.playbackRate = 1.5;
  const game = new Game(customEvents);
  const gv = new GameView(game, ctx, holdCtx, nextCtx, bgm, customEvents);
  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    play.style.display = 'none';
    document.querySelector('.play-holder').style.display = 'none';
    bgm.play();
    gv.start();
  })
})

const createCustomEvents = () => {
  let customEvents = {};
  customEvents.gameOver = new CustomEvent('gameOver');
  customEvents.cantRotate = new CustomEvent('cantRotate');
  customEvents.lineClear = new CustomEvent('lineClear');
  customEvents.placeBlock = new CustomEvent('placeBlock');
  customEvents.rotate = new CustomEvent('rotate');
  return customEvents;
}
