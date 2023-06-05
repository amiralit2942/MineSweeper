import { CONFIG } from "../config";
import { GameScene } from "./game";
import { Colors, Textures } from "../resources";
import { randomBetweenTwoIntegers } from "../utils/number";
import { SimpleButton } from "../views/simple_button";
import { createObservable } from "../utils/observable";
import { Tweens } from "phaser";
import { delay } from "../utils/delay";

export class buttonsManager {

    constructor(scene = new GameScene, columns = 0, rows = 0, bombCount = 0) {
        //Scene Info
        this.scene = scene;
        this.columns = columns;
        this.rows = rows;

        //Numbers To Know
        this.bombGuessesCount = createObservable(0);
        this.bombCount = bombCount;
        this.foundedBombs = createObservable(0);
        this.foundedBombs.listeners.add(() => this.checkCorrectGusses());
        this.foundedSafeBtns = createObservable(0);
        this.foundedSafeBtns.listeners.add(() => this.checkCorrectGusses());
        /**
         * @type {mineButton[]}
         */


        //Drawing Grid
        this.fieldWidth = CONFIG.screen.width - 200;
        this.fieldHeight = CONFIG.screen.height - 400;
        this.buttons = [];
        let x = 100 + ((this.fieldWidth - columns * 55) / 2)
        let y = 200 + ((this.fieldHeight - rows * 55) / 2)


        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let newButton = new mineButton({
                    scene: this.scene,
                    posX: x + j * 70,
                    posY: y + i * 70,
                    texture: Textures.UnpushedButton,
                    rowIndex: i, columnIndex: j,
                })
                this.buttons.push(newButton);
            }
        }


        this.scene.setBomb(this.buttons);




    }

    checkCorrectGusses = () => {

        if (this.foundedBombs.value == this.bombCount)
            this.scene.gameOver(true);

        if (this.foundedSafeBtns.value == this.rows * this.columns - this.bombCount)
            this.scene.gameOver(true);
    }

    destroyBtns = () => {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].text.destroy();
            this.buttons[i].flagImg.destroy();
            this.buttons[i]._imageView.destroy();
        }
    }
}


export class mineButton extends SimpleButton {

    constructor({
        scene = new GameScene,
        posX = 0, posY = 0, texture = '',
        origin = { x: 0.5, y: 0.5 },
        pointerDownAlpha = 0.4,
        pointerOverAlpha = 0.8,
        normalAlpha = 1,
        disabledAlpha = 0.2,
        rowIndex = 0, columnIndex = 0,
    }) {
        super({ scene, x: posX, y: posY, texture, origin, pointerDownAlpha, pointerOverAlpha, normalAlpha, disabledAlpha });
        //Button Info
        this.scene = scene;
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
        this.hasBomb = false;
        this.x = posX;
        this.y = posY;

        //Contents
        this.text = scene.add
            .text(posX, posY, rowIndex + " " + columnIndex, CONFIG.defaultTextStyle)
            .setColor(Colors.ToHex(0x000000))
            .setFontSize(25).setOrigin(0.5, 0.5).setVisible(false);
        this.flagImg = this.scene.add.image(this.x, this.y, Textures.RedFlag).setScale(0.1, 0.1).setOrigin(0.5, 0.5).setVisible(false);

        //Marks
        this.isCalledSafe = false;
        this.hasFlag = false;
        this.isSelected = false;

        //Particle
        this.explosionParticle = this.scene.add.particles('explosion');
        this.explosionParticle.depth = 1000;

        this.onClick = () => {
            if (this.isSelected)
                return

            this.isSelected = true;
            this.isCalledSafe = true;
            if (this.hasBomb) {

                this.explosionParticle.createEmitter({
                    quantity: 10,
                    speed: 100,
                    lifespan: 500,
                    x: this.x,
                    y: this.y,
                    scale: 0.25,
                    maxParticles: 50,
                })
                this.text.text = "BOOM";
                this.text.setFontSize(20);
                this.scene.gameOver(false);
                return;
            }
            this.scene.buttonsManager.foundedSafeBtns.value++;

            let bombCounter = 0;

            for (var x = -1; x < 2; x++) {
                for (var y = -1; y < 2; y++) {
                    //The Button Its Self
                    if (x == 0 && y == 0)
                        continue;

                    //Find Neighbours
                    let otherBomb = scene.buttonsManager
                        .buttons
                        .find(t => t.columnIndex == this.columnIndex + x && t.rowIndex == this.rowIndex + y);
                    if (otherBomb == undefined)
                        continue;
                    if (otherBomb.hasBomb)
                        bombCounter++;
                }
            }
            //Set Founded Bombs Number
            this.text.setVisible(true);
            this.text.text = bombCounter;

            //No Bombs Founded
            if (bombCounter == 0) {
                this.callSafe();
            }

        }

        //??? Ask how to change btns alpha after it's pushed
        this._pointerUp = () => { }

        this._rightButtonDown = () => {
            if (this.isSelected)
                return;
            //Remove Mark
            if (this.hasFlag) {
                //this.text.setVisible(true);
                this.flagImg.setVisible(false)
                this.hasFlag = false;

                if (this.hasBomb) {
                    this.scene.buttonsManager.foundedBombs.value -= 1;
                }
                this.scene.buttonsManager.bombGuessesCount.value -= 1
                return;
            }

            //Add Mark

            //No more flags available
            if (this.scene.buttonsManager.bombGuessesCount.value == this.scene.buttonsManager.bombCount)
                return;

            this.scene.buttonsManager.bombGuessesCount.value += 1
            //this.text.setVisible(false);
            this.hasFlag = true;
            this.flagImg.setVisible(true)
            //Guessed correctly
            if (this.hasBomb) {
                this.scene.buttonsManager.foundedBombs.value += 1;
            }

        }
    }

    callSafe = async () => {

        let neighbours = []
        this.isCalledSafe = true;
        //Check if there are no bombs around
        for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
                if (x == 0 && y == 0)
                    continue;
                let otherBomb = this.scene.buttonsManager.buttons.find(t => t.columnIndex == this.columnIndex + x && t.rowIndex == this.rowIndex + y);
                if (otherBomb == undefined)
                    continue;
                if (otherBomb.hasBomb)
                    return;

                neighbours.push(otherBomb)
            }
        }
        //this.callSafeTween.play();
        this.isSelected = true;
        this.text.text = "0";
        this.text.setVisible(true);
        await delay(50)
        //Call neighbours callSafe
        for (var i = 0; i < neighbours.length; i++) {

            if (!neighbours[i].isCalledSafe)
                neighbours[i].callSafe();
        }


    }
}
