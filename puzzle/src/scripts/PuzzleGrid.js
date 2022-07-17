import { Container } from "@pixi/display";
import { puzzleConfig } from "./puzzleConfig";
import { PuzzlePiece } from "./PuzzlePiece";

export class PuzzleGrid {
  constructor() {
    this.container = new Container();
    this.container.x = window.innerWidth / 2;
    this.container.y = window.innerHeight / 2;
    this.container.sortableChildren = true;
    this.createPuzzlePieces();
  }

  createPuzzlePieces() {
    this.pieces = [];
    let ids = puzzleConfig.map((el) => el.id);
    puzzleConfig.forEach((field) => {
      const randomNum = Math.floor(Math.random() * ids.length);
      const id = ids[randomNum];
      ids = ids.filter((el) => el !== id);

      const piece = new PuzzlePiece({ id, field });
      const { sprite } = piece;

      this.container.addChild(sprite);
      this.pieces.push(piece);
      piece.on("drag-end", () => this.onPieceDragEnd(piece));
    });
  }

  onPieceDragEnd(piece) {
    const pieceToReplace = this.pieces.find(
      (item) =>
        item !== piece &&
        piece.sprite.x >= item.left &&
        piece.sprite.x <= item.right &&
        piece.sprite.y <= item.bottom &&
        piece.sprite.y >= item.top
    );

    if (pieceToReplace) {
      const { field: replaceField } = pieceToReplace;
      pieceToReplace.setField(piece.field);
      piece.setField(replaceField);
      return;
    }

    piece.resetPosition();
  }
}
