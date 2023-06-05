import { GameObjects } from "phaser";
import Phaser from "phaser";
import { ABSLayoutGroup } from "./abs_layoutgroup";
export class Column extends ABSLayoutGroup {
    updateViews() {
        let currentY = this.y;
        for (var i = 0; i < this._children.length; i++) {
            let c = this._children[i];
            c.setPosition(this.x, currentY);
            currentY += c.height + this._gap;
        }
    }
}