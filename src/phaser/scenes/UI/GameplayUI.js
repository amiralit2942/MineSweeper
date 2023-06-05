import { CONFIG } from "../../config";
import { Textures } from "../../resources";
import { GameScene } from "../game";

export class ScorePanelUI {


    constructor(scene = new GameScene) {
        this.scene = scene;

        this.scorePanel = this.scene.add.image(CONFIG.screen.width / 2, 80, Textures.UnpushedButton)
            .setAlpha(0.5)
            .setOrigin(0.5, 0.5)
            .setScale(20, 2)
            .setVisible(true);
        this.panelX = this.scorePanel.x;
        this.panelY = this.scorePanel.y;


        this.bombCountTxt = this.scene.add
            .text(this.panelX / 4, this.panelY, "0", CONFIG.defaultTextStyle)
            .setFontSize(50).setOrigin(0.5, 0.5)

        this.scoreTxt = this.scene.add
            .text(this.panelX * 7 / 4, this.panelY, "0", CONFIG.defaultTextStyle)
            .setFontSize(50).setOrigin(0.5, 0.5)

        this.statusPic = this.scene.add.image(this.panelX, this.panelY, Textures.Smile).setScale(0.15, 0.15)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.restart();
            })

        this.scene.buttonsManager.foundedSafeBtns.listeners.add(this.updateScoreTxt);
        this.scene.buttonsManager.bombGuessesCount.listeners.add(this.updateBombCountTxt);
        this.updateBombCountTxt();


    }

    gameOver = (hasWon = true) => {
        if (!hasWon)
            this.statusPic.setTexture(Textures.Skull);
    }

    updateScoreTxt = () => {
        this.scoreTxt.text = this.scene.buttonsManager.foundedSafeBtns.value;
    }

    updateBombCountTxt = () => {
        this.bombCountTxt.text = this.scene.buttonsManager.bombCount - this.scene.buttonsManager.bombGuessesCount.value;
    }

    hideUI = () => {
        this.scorePanel.setVisible(false);
        this.bombCountTxt.setVisible(false);
        this.scoreTxt.setVisible(false);
        this.statusPic.setVisible(false);
    }

    ShowUI = () => {
        this.scorePanel.setVisible(true);
        this.bombCountTxt.setVisible(true);
        this.scoreTxt.setVisible(true);
        this.statusPic.setVisible(true);
    }


}