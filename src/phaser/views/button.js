import Phaser from "phaser"
export class Button {
    _imageView
    _children = []
    onClick = () => { }
    constructor({
        scene = new Phaser.Scene(),
        x = 0, y = 0, texture = '',
        origin = { x: 0.5, y: 0.5 },
    }) {
        this.scene = scene;
        this._imageView = scene.add.image(x, y, texture).setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                if (this.scene.input.activePointer.rightButtonDown())
                    this._rightButtonDown()
                else
                    this._pointerDown()
            })
            .on('pointerup', () => this._pointerUp())
            .on('pointerover', () => this._pointerOver())
            .on('pointerout', () => this._pointerOut())
        this._imageView.setP = this._imageView.setPosition;
        this._imageView.setPosition = (x, y, z, w) => {
            this._imageView.setP(x, y, z, w);
            for (var i = 0; i < this._children.length; i++)
                this._children[i].setPosition(x, y, z, w);
        }
    }
    /**
     * 
     * @param {Phaser.GameObjects.Components.Transform} child 
     * @returns {Button}
     */
    addChild(child) {
        child.x = this._imageView.x;
        child.y = this._imageView.y;
        child.setOrigin(this._imageView.originX, this._imageView.originY);
        child.setDepth(this._imageView.depth + this._children.length);
        this._children.push(child);
        return this;
    }
    /**
     * @returns {Phaser.GameObjects.Image}
     */
    get display() {
        return this._imageView;
    }

    setSale(scale = { x: 1, y: 1 }) {
        this._imageView.setScale(scale.x, scale.y);
    }
    //override in children:
    _pointerDown() {
        this.onClick();
    }
    _pointerUp() { }
    _pointerOver() { }
    _pointerOut() { }
    _rightButtonDown() { }
}