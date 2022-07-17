import { Sprite } from "@pixi/sprite";
import { Globals } from "./Globals";
import { EventEmitter } from "@pixi/utils";
import TWEEN from "@tweenjs/tween.js";

export class PuzzlePiece extends EventEmitter {
  constructor({ field, id }) {
    super();

    this.field = field;
    this.sprite = new Sprite(Globals.resources[`puzzle${id}`].texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.5);

    this.resetPosition();
    this.setInteractive();
  }

  setInteractive() {
    this.sprite.interactive = true;
    this.sprite.on("pointerdown", this.onTouchStart, this);
    this.sprite.on("pointermove", this.onMouseMove, this);
    this.sprite.on("pointerup", this.onTouchEnd, this);
  }

  onTouchStart(e) {
    this.touchPosition = { x: e.data.global.x, y: e.data.global.y };
    this.dragging = true;

    // grid: this.container.sortableChildren = true; 設定後才會生效
    this.sprite.zIndex = 1;

    Globals.resources.click.sound.play();
    console.log(Globals.resources);
  }

  onMouseMove(e) {
    if (!this.dragging) return;

    //獲取當前坐標
    const currentPosition = { x: e.data.global.x, y: e.data.global.y };

    // 計算偏移量
    const offsetX = currentPosition.x - this.touchPosition.x;
    const offsetY = currentPosition.y - this.touchPosition.y;
    this.sprite.x = this.field.x + offsetX;
    this.sprite.y = this.field.y + offsetY;
  }

  onTouchEnd(e) {
    this.dragging = false;
    this.sprite.zIndex = 0;
    this.emit("drag-end");
    Globals.resources.click.sound.play();
  }

  resetPosition() {
    const tween = new TWEEN.Tween(this.sprite);
    tween.to({ x: this.field.x, y: this.field.y }, 300);

    tween.onStart(() => {
      console.log("tween start");
    });
    tween.onUpdate(() => {
      console.log("tween update");
    });
    tween.onComplete(() => {
      console.log("tween completed");
    });

    tween.easing(TWEEN.Easing.Back.Out);

    tween.start();
    // this.sprite.x = this.field.x;
    // this.sprite.y = this.field.y;
  }

  setField(field) {
    this.field = field;
    this.resetPosition();
  }

  get left() {
    return this.sprite.x - this.sprite.width / 2;
  }
  get right() {
    return this.sprite.x + this.sprite.width / 2;
  }
  get top() {
    return this.sprite.y - this.sprite.height / 2;
  }
  get bottom() {
    return this.sprite.y + this.sprite.height / 2;
  }
}
