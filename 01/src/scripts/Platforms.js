import * as PIXI from "pixi.js";
import { Platform } from "./Platform";

export class Platforms {
  constructor() {
    this.platforms = [];
    this.container = new PIXI.Container();

    this.ranges = {
      rows: {
        min: 2,
        max: 6,
      },
      cols: {
        min: 3,
        max: 9,
      },
      offset: {
        min: 60,
        max: 200,
      },
    };

    this.createPlatform({
      rows: 4,
      cols: 6,
      x: 200,
    });
  }

  createPlatform(data) {
    const { rows, cols, x } = data;
    const platform = new Platform({ rows, cols, x });
    this.current = platform;
    this.container.addChild(platform.container);
    this.platforms.push(platform);

    platform.container.once("hidden", () => {
      this.platforms = this.platforms.filter((item) => item !== platform);
      platform.container.destroy();
    });
  }

  update(dt) {
    if (this.current.right < window.innerWidth) {
      this.createPlatform(this.randomData);
    }

    this.platforms.forEach((platform) => {
      platform.move();
    });
  }

  checkCollision(hero) {
    this.platforms.forEach((platform) => {
      platform.checkCollision(hero)
    });
  }

  // const randomNum = min + Math.round(Math.random() * (max - min));
  get randomData() {
    let data = {
      rows: 0,
      cols: 0,
      x: 0,
    };

    const randomNum = (min, max) =>
      min + Math.round(Math.random() * (max - min));

    const { min: rowsMin, max: rowsMax } = this.ranges.rows;
    data.rows = randomNum(rowsMin, rowsMax);

    const { min: colsMin, max: colsMax } = this.ranges.cols;
    data.cols = randomNum(colsMin, colsMax);

    const { min: offsetMin, max: offsetMax } = this.ranges.offset;
    const offset = randomNum(offsetMin, offsetMax);
    data.x = this.current.right + offset;

    return data;
  }
}
