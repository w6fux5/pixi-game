import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { Platform } from "./Platform";

export class Hero {
  constructor() {
    this.dy = 0;
    this.platform = null;
    this.jumpIndex = 0;

    this.texture = [
      Globals.resources["walk1"].texture,
      Globals.resources["walk2"].texture,
    ];

    this.createSprite();
  }

  createSprite() {
    const sprite = new PIXI.AnimatedSprite(this.texture);

    sprite.x = 200;
    sprite.y = 0;
    sprite.loop = true;
    sprite.animationSpeed = 0.1;
    // sprite.interactive = true
    // sprite.buttonMode = true
    // sprite.play();

    this.sprite = sprite;
  }

  stayOnPlatform(platform) {
    this.platform = platform;
    this.dy = 0;
    this.jumpIndex = 0;
    this.sprite.y = platform.top - this.sprite.height;
  }

  moveLeftByPlatform(platform) {
    this.sprite.x = platform.nextLeft - this.sprite.width;
  }

  startJump() {
    if (this.platform || this.jumpIndex === 1) {
      ++this.jumpIndex;
      this.platform = null;
      this.dy = -18;
    }

    if (this.jumpIndex === 2) {
      this.sprite.stop();
      this.sprite.texture = Globals.resources["jump"].texture;
    }
  }

  update() {
    if (!this.platform) {
      ++this.dy;
      this.sprite.y += this.dy;
    }

    if (this.dy === 10) {

      this.sprite.play();
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
