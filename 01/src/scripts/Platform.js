import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { Diamond } from "./Diamond";

const TILE_SIZE = 64;

export class Platform {
  constructor({ rows, cols, x }) {
    this.diamonds = [];
    this.diamondsOffsetMin = 100;
    this.diamondsOffsetMax = 200;

    this.dx = -5;

    this.rows = rows;
    this.cols = cols;

    this.width = cols * TILE_SIZE;
    this.height = rows * TILE_SIZE;

    this.createContainer(x);
    this.createTiles();
    this.createDiamonds();
  }

  createDiamonds() {
    const y = this.diamondsOffsetMin + Math.random() * (this.diamondsOffsetMax - this.diamondsOffsetMin)

    for (let i =0; i < this.cols; i++) {
      if(Math.random() < 0.4) {
        const diamond = new Diamond(64 * i, -y)
        this.container.addChild(diamond.sprite)
        this.diamonds.push(diamond)
      }
    }
  }

  createContainer(x) {
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = window.innerHeight - this.rows * TILE_SIZE;
  }

  createTiles() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.createTile(row, col);
      }
    }
  }

  createTile(row, col) {
    const texture = row === 0 ? "platform" : "tile";
    const tile = new PIXI.Sprite(Globals.resources[texture].texture);
    this.container.addChild(tile);
    tile.x = col * tile.width;
    tile.y = row * tile.height;
  }

  move() {
    this.container.x += this.dx;

    if (this.right < 0) {
      this.container.emit("hidden");
    }
  }

  checkCollision(hero) {
    if (this.isCollideTop(hero)) {
      hero.stayOnPlatform(this);
      return;
    }

    if (this.isCollideLeft(hero)) {
      hero.moveLeftByPlatform(this);
    }

    if (hero.platform === this) {
      hero.platform = null;
    }
  }

  isCollideTop(hero) {
    return (
      hero.right >= this.left &&
      hero.left <= this.right &&
      hero.bottom <= this.top &&
      hero.nextBottom >= this.top
    );
  }

  isCollideLeft(hero) {
    return (
      hero.bottom >= this.top &&
      hero.top <= this.bottom &&
      hero.right <= this.left &&
      hero.right >= this.nextLeft
    );
  }

  get right() {
    return this.left + this.width;
  }

  get top() {
    return this.container.y;
  }

  get bottom() {
    return this.top + this.height;
  }
  get left() {
    return this.container.x;
  }

  get nextLeft() {
    return this.left + this.dx;
  }
}
