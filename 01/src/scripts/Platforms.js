import * as PIXI from "pixi.js";
import { Platform } from "./Platform";

export class Platforms {
  constructor() {
    this.platforms = [];
    this.container = new PIXI.Container();

    this.createPlatform({
      rows: 3,
      cols: 3,
      x: 600,
    });
  }

  createPlatform(data) {
    const { rows, cols, x } = data;
    const platform = new Platform({ rows, cols, x });
    this.container.addChild(platform.container);
    this.platforms.push(platform);
  }
}
