import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { Platform } from "./Platform";

export class Hero {
  constructor() {
    this.dy = 0;
    this.platform = null;

    this.createSprite();
  }

  createSprite() {
    const sprite = new PIXI.AnimatedSprite([
      Globals.resources["walk1"].texture,
      Globals.resources["walk2"].texture,
    ]);

    sprite.x = 200;
    sprite.y = 0;
    sprite.loop = true;
    sprite.animationSpeed = 0.1;
    sprite.play();

    this.sprite = sprite;
  }

  stayOnPlatform(platform) {
    this.platform = platform;
    this.dy = 0;
    this.sprite.y = platform.top - this.sprite.height;
  }

  moveLeftByPlatform(platform) {
    this.sprite.x = platform.nextLeft - this.sprite.width;
  }

  // moveByPlatformRight(Platform) {
  //   this.sprite.x = this.sprite.x + 10
  // }

  startJump() {
    if (this.platform) {
      this.platform = null;
      this.dy = -18;
    }
  }

  update() {
    if (!this.platform) {
      ++this.dy;
      this.sprite.y += this.dy;
    }
  }

  get left() {
    return this.sprite.x;
  }

  get right() {
    return this.left + this.sprite.width;
  }

  get top() {
    return this.sprite.y;
  }

  get bottom() {
    return this.top + this.sprite.height;
  }

  get nextBottom() {
    return this.bottom + this.dy;
  }
}
