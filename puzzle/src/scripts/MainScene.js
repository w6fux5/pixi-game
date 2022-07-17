import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Globals } from "./Globals";
import { PuzzleGrid } from "./PuzzleGrid";

export class MainScene {
  constructor() {
    Globals.resources.bgMusic.sound.play({
      loop: true,
      volume: 0.1,
    });

    this.container = new Container();
    this.createBackground();
    this.createPuzzleGrid();
  }

  createBackground() {
    this.bg = new Sprite(Globals.resources["bg"].texture);
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
  }

  createPuzzleGrid() {
    const grid = new PuzzleGrid();
    this.container.addChild(grid.container);
  }
}
