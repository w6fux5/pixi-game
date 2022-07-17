import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

const TILE_SIZE = 64;

export class Platform {
  constructor({ rows, cols, x }) {
    this.rows = rows;
    this.cols = cols;

    this.createContainer(x);
    this.createTiles();
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
    const texture = row === 0 ? 'platform' : 'tile'
    const tile = new PIXI.Sprite(Globals.resources[texture].texture);
    this.container.addChild(tile);
    tile.x = col * tile.width;
    tile.y = row * tile.height;
  }
}
