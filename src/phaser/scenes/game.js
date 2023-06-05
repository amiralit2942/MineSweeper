import { Colors, loadTexture, MyScenes, Textures } from "../resources";
import { createObservable } from '../utils/observable';
import Phaser from "phaser";
import { API } from "../../data/api";
import { delay } from '../utils/delay';
import { CONFIG } from "../config";
import { Button } from "../views/button";
import { SimpleButton } from "../views/simple_button";
import { buttonsManager } from "./buttonsManager";
import { HtmlUtil } from "../utils/htmlUtil";
import { StartUI } from "./UI/StartUI";
import { randomBetweenTwoIntegers } from "../utils/number";
import { EndUI } from "./UI/EndUI";
import { configure } from "@testing-library/react";
import { ScorePanelUI } from "./UI/GameplayUI";
const TEST_PUBLIC_KEY = "test-user-" + Date.now();
export class GameScene extends Phaser.Scene {
    constructor() {
        super(MyScenes.Game);
    }

    preload() {
        loadTexture(this, Textures.YellowButton);
        loadTexture(this, Textures.RedFlag);
        loadTexture(this, Textures.PushedButton);
        loadTexture(this, Textures.UnpushedButton);
        loadTexture(this, Textures.Black);
        loadTexture(this, 'explosion');
        loadTexture(this, Textures.Hamburger);
        loadTexture(this, Textures.Smile);
        loadTexture(this, Textures.Skull);
        loadTexture(this, Textures.Glasses);
        // this.load.spritesheet('explosion', '/assets/spritesheet.png', {
        //     frameWidth: 1326,
        //     frameHeight: 102,

        // });
    }

    create() {
        this.input.mouse.disableContextMenu();
        this.formUtil = new HtmlUtil(this);
        this.startUI = new StartUI(this);
        this.endUI = new EndUI(this);


        //Test
        // this.angle1 = this.add.image(100, 200, Textures.Hamburger);
        // this.angle1 = this.add.image(CONFIG.screen.width - 100, 200, Textures.Hamburger);
        // this.angle1 = this.add.image(100, CONFIG.screen.height - 200, Textures.Hamburger);
        // this.angle1 = this.add.image(CONFIG.screen.width - 100, CONFIG.screen.height - 200, Textures.Hamburger);

    }

    update() {

    }

    //Called by startUI
    startGame = (gridSize = 5) => {
        this.gridSize = gridSize;
        this.buttonsManager = new buttonsManager(this, gridSize, gridSize, gridSize);
        this.scorePanel = new ScorePanelUI(this);
    }

    //Called by scorePanel and endUI
    restart = () => {
        this.buttonsManager.destroyBtns();
        this.startUI.showUI();
        this.scorePanel.hideUI();
    }

    //API will replace this
    setBomb = (buttons = [], bombAmount = Math.sqrt(buttons.length)) => {
        for (var i = 0; i < bombAmount; i++) {
            let index = randomBetweenTwoIntegers(0, buttons.length);
            while (buttons[index].hasBomb)
                index = randomBetweenTwoIntegers(0, buttons.length);
            buttons[index].hasBomb = true;
            console.log("Button: " + buttons[index].rowIndex + buttons[index].columnIndex + "has Bomb");
        }

    }

    gameOver = (hasWon = true) => {
        this.scorePanel.gameOver(hasWon);
        this.endUI.gameOver(hasWon);
    }


}