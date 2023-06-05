import { GameObjects } from "phaser";
import Phaser from "phaser";
import { ABSLayoutGroup } from "./abs_layoutgroup";
export class Row extends ABSLayoutGroup {
    updateViews() {
        let currentX = this.x;
        for (var i = 0; i < this._children.length; i++) {
            let c = this._children[i];
            c.setPosition(currentX, this.y);
            currentX += c.width + this._gap;
        }
    }
    getWidth() {
        if (this._children.length == 0)
            return 0;
        this.updateViews();
        let firstChild = this._children[0];
        let lastChild = this._children[this._children.length - 1];
        let start = firstChild.x - firstChild.originX * firstChild.width;
        let end = lastChild.x + (1 - lastChild.originX) * lastChild.width;
        return end - start;
    }
    updateDebugViews() {
        if (this.graphics == undefined) {
            this.graphics = this.scene.add.graphics();
        }
        this.graphics.clear();
        this._drawRectZone();
    }
    _drawRectZone() {
        if (this._children.length == 0)
            return 0;
        let firstChild = this._children[0];
        let lastChild = this._children[this._children.length - 1];
        let start = firstChild.x - firstChild.originX * firstChild.width;
        let end = lastChild.x + (1 - lastChild.originX) * lastChild.width;
        this.graphics.fillRect(start, this.y, end - start, 200);
        this.graphics.fillStyle(0xaa0000, 0.2);
    }
}