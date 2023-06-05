import { GameScene } from "../game";
import { CONFIG } from "../../config";
import { SimpleButton } from "../../views/simple_button";
import { Textures } from "../../resources";

export class StartUI {
    constructor(scene = new GameScene) {
        this.scene = scene;

        //TextMessage
        this.scene.formUtil.scaleToGameW("textMessage", .1);
        this.scene.formUtil.scaleToGameH("textMessage", .04);
        this.scene.formUtil.placeElementAt("textMessage", CONFIG.screen.width / 2, CONFIG.screen.height / 2 - 200);
        //this.formUtil.addChangeCallback("area51", this.textAreaChanged, this);


        //InputField
        this.scene.formUtil.scaleToGameW("inputField", .1);
        this.scene.formUtil.scaleToGameH("inputField", .04);
        this.scene.formUtil.placeElementAt('inputField', CONFIG.screen.width / 2, CONFIG.screen.height / 2 - 150);

        this.startButton = this.scene.add
            .image(CONFIG.screen.width / 2 + 30, CONFIG.screen.height / 2 + 180, Textures.YellowButton, "START")
            .setOrigin(0.5,0.5)
            .setInteractive()
            .on("pointerdown", () => {
                this.startBtnFunc();
            })

        this.startButtonTxt = this.scene.add
            .text(CONFIG.screen.width / 2 + 30, CONFIG.screen.height / 2 + 180, "START", CONFIG.defaultTextStyle)
            .setScale(1.5, 1.5)
            .setOrigin(0.5, 0.5);

    }

    startBtnFunc = () => {
        let gridSize = this.scene.formUtil.getTextAreaValue("inputField");
        console.log(gridSize);
        this.scene.startGame(gridSize);
        this.hideUI();
    }

    hideUI = () => {
        this.scene.formUtil.hideElement("textMessage")
        this.scene.formUtil.hideElement("inputField")
        this.startButton.setVisible(false);
        this.startButtonTxt.setVisible(false);
    }

    showUI = () => {
        this.scene.formUtil.showElement("textMessage")
        this.scene.formUtil.showElement("inputField")
        this.startButton.setVisible(true);
        this.startButtonTxt.setVisible(true);
    }
}