import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Diamond {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    console.log(y)

    this.createSprite();
  }

  createSprite() {
    this.sprite = new PIXI.Sprite(Globals.resources["diamond"].texture);
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}
