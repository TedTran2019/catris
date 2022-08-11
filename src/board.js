// Board holds all 40 rows
// The game only renders from 20 and beyond
// Draw from 20 to 40, x - 20 * blocksize
// Let rest be abstracted away
import CatBlockRed from './images/catblock-red.png';
import CatBlockBlue from './images/catblock-blue.png';
import CatBlockGreen from './images/catblock-green.png';
import CatBlockOrange from './images/catblock-orange.png';
import CatBlockPurple from './images/catblock-purple.png';
import CatBlockTeal from './images/catblock-teal.png';
import CatBlockYellow from './images/catblock-yellow.png';

export default class Board {
  constructor(cols, rows, blockSize) {
    this.rows = rows;
    this.cols = cols;
    this.blockSize = blockSize;
    this.grid = this.createGrid();
    const colors = ['blue', 'green', 'orange', 'purple', 'red', 'teal', 'yellow'];
    this.images = this.createImages(colors);
  }

  createImages(colors) {
    const images = {};
    colors.forEach(color => {
      images[color] = new Image();
      // images[color].src = `./images/catblock-${color}.png`;
    });
    images['blue'].src = CatBlockBlue;
    images['green'].src = CatBlockGreen;
    images['orange'].src = CatBlockOrange;
    images['purple'].src = CatBlockPurple;
    images['red'].src = CatBlockRed;
    images['teal'].src = CatBlockTeal;
    images['yellow'].src = CatBlockYellow;
    return images;
  }

  createGrid() {
    return Array.from(Array(this.rows), () => Array(this.cols).fill(null));
  }

  // 40 rows, but only render 20-40 in the spots of 0-20
  draw(ctx) {
    for (let y = 20; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let tile = this.grid[y][x];
        if (tile === null) {
          this.drawEmpty(ctx, x * this.blockSize, (y - 20) * this.blockSize);
        } else {
          this.drawTile(ctx, x * this.blockSize, (y - 20) * this.blockSize, tile);
        }
      }
    }
  }

  // draw(ctx) {
  //   this.grid.forEach((row, y) => {
  //     row.forEach((ele, x) => {
  //       if (ele === null) {
  //         this.drawEmpty(ctx, x * this.blockSize, y * this.blockSize);
  //       } else {
  //         this.drawTile(ctx, x * this.blockSize, y * this.blockSize, ele);
  //       }
  //     })
  //   })
  // }

  drawTile(ctx, x, y, tile) {
    // tile.draw(ctx);
    // ctx.fillStyle = tile;
    // ctx.fillRect(x, y, this.blockSize, this.blockSize);
    ctx.drawImage(this.images[tile], x, y, this.blockSize, this.blockSize);
  }

  // drawTile(ctx, x, y, tile) {
  //   ctx.drawImage(tile, x, y, this.blockSize, this.blockSize);
  // }

  drawEmpty(ctx, x, y) {
    ctx.strokeStyle = "#633ecc";
    ctx.globalAlpha = 0.2;
    ctx.strokeRect(x, y, this.blockSize, this.blockSize);
    ctx.globalAlpha = 1;
  }

  isInBounds(x, y) {
    return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
  }

  isOccupied(x, y) {
    return this.grid[y][x] !== null;
  }

  isValidPos(x, y) {
    return this.isInBounds(x, y) && !this.isOccupied(x, y);
  }

  addTetrimino(tetrimino) {
    tetrimino.shape.forEach((row, y) => {
      row.forEach((block, x) => {
        if (block === 1) {
          this.grid[tetrimino.y + y][tetrimino.x + x] = tetrimino.color;
        }
      })
    })
  }

  clearRows() {
    let linesCleared = 0;
    this.grid.forEach((row, y) => {
      if (row.every(block => block !== null)) {
        linesCleared += 1;
        this.grid.splice(y, 1);
        this.grid.unshift(Array(this.cols).fill(null));
      }
    })
    return linesCleared;
  }
}
