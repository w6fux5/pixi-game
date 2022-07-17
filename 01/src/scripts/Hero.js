import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Hero {
  constructor() {
    this.dy = 0;
    this.platform = null;

    this.createSprite();
  }

  createSprite() {
    this.sprite = new PIXI.AnimatedSprite([
      Globals.resources["walk1"].texture,
      Globals.resources["walk2"].texture,
    ]);
    this.sprite.x = 200
    this.sprite.y = 0

    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
  }

  update() {
    if(!this.platform) {
        ++this.dy
        this.sprite.y += this.dy
    }
  }
}
