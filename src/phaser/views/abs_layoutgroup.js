import { GameObjects } from "phaser";
import Phaser from "phaser";
export class ABSLayoutGroup {
    _x
    _y
    _gap
    _children
    constructor({ x = 0, y = 0, gap = 0, scene = new Phaser.Scene() }) {
        this.scene = scene;
        this._x = x;
        this._y = y;
        this._gap = gap;
        this._children = [];
    }
    get x() {
        return this._x;
    }
    set x(val) {
        this._x = val;
        this.updateViews();
    }
    get y() {
        return this._y;
    }
    set y(val) {
        this._y = val;
        this.updateViews();
    }
    get gap() {
        return this._gap;
    }
    set gap(val) {
        this._gap = val;
        this.updateViews();
    }
    updateViews() {
        let currentY = this.y;
        for (var i = 0; i < this._children.length; i++) {
            let c = this._children[i];
            c.setPosition(this.x, currentY);
            // c.x = this.x;
            // c.y = currentY;
            // currentY += c.height + this._gap;
        }
    }
    add(c = new GameObjects.Image()) {
        this._children.push(c);
        this.updateViews();
    }
    remove(c) {
        let index = this._children.findIndex(t => t == c);
        if (index == -1)
            return;
        this.removeAt(index);
    }
    removeAt(index = 0) {
        this._children.splice(index, 1);
        this.updateViews();
    }
    setVisible(visible = true) {
        for (var i = 0; i < this._children.length; i++)
            this._children[i].setVisible(visible);
    }
}