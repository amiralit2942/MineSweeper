import { Button } from "./button";
import Phaser from "phaser";


export class SimpleButton extends Button {
    _disabled = false
    _disabledAlpha = 0.2
    pointerDownAlpha
    pointerOverAlpha
    normalAlpha
    constructor({
        scene = new Phaser.Scene(),
        x = 0, y = 0, texture = '',
        origin = { x: 0.5, y: 0.5 },
        pointerDownAlpha = 0.4,
        pointerOverAlpha = 0.8,
        normalAlpha = 1,
        disabledAlpha = 0.2,
    }) {
        super({ scene, x, y, texture, origin });
        this.pointerDownAlpha = pointerDownAlpha;
        this.pointerOverAlpha = pointerOverAlpha;
        this.normalAlpha = normalAlpha;
        this._disabledAlpha = disabledAlpha;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val = false) {
        this._disabled = val;
        this._imageView.setAlpha(val ? this._disabledAlpha : this.normalAlpha);
    }
    _pointerDown() {
        if (this._disabled)
            return;
        super._pointerDown();
        this._imageView.setAlpha(this.pointerDownAlpha);
    }
    _pointerUp() {
        if (this._disabled)
            return;
        this._imageView.setAlpha(this.pointerOverAlpha);
    }
    _pointerOver() {
        if (this._disabled)
            return;
        this._imageView.setAlpha(this.pointerOverAlpha);
    }
    _pointerOut() {
        if (this._disabled)
            return;
        this._imageView.setAlpha(this.normalAlpha);
    }
    _rightButtonDown() {
        if (this.disabled)
            return;

    }
}