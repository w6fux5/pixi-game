import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { Background } from "./Background";
import { Platforms } from "./Platforms";
import { Hero } from "./Hero";

export class MainScene {
  constructor() {
    this.container = new PIXI.Container();
    // Globals.resources.music.sound.play({
    //     loop: true,
    //     volume: 0.2
    // });
    this.createBackground();
    this.createPlatforms();
    this.createHero();
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createPlatforms() {
    this.platforms = new Platforms();
    this.container.addChild(this.platforms.container);
  }

  createHero() {
    this.hero = new Hero();
    this.container.addChild(this.hero.sprite);
  }

  update(dt) {
    this.bg.update(dt);
    this.platforms.update(dt);
    this.hero.update(dt);
  }
}
