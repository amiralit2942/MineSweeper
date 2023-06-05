import { CONFIG } from "../../config";
import { Colors, Textures } from "../../resources";
import { SimpleButton } from "../../views/simple_button";
import { GameScene } from "../game";

export class EndUI {
    constructor(scene = new GameScene) {
        this.scene = scene;

        this.bgPanel = this.scene.add
            .image(CONFIG.screen.width / 2, CONFIG.screen.height / 2, Textures.Black)
            .setAlpha(.5).setDepth(1000).setScale(1000, 1000).setInteractive().setVisible(false);
        this.gameOvertext = this.scene.add
            .text(CONFIG.screen.width / 2, CONFIG.screen.height / 2, "Game Over!", CONFIG.defaultTextStyle).setFontSize(50)
            .setScale(1, 1).setDepth(1000).setOrigin(0.5, 0.5).setVisible(false);

        this.restartButton = this.scene.add
            .image(CONFIG.screen.width / 2, CONFIG.screen.height / 2 + 100, Textures.YellowButton)
            .setInteractive()
            .on("pointerdown", () => {
                //Restart func
                this.hideUI();
                this.scene.restart();
            })
            .setVisible(false).setDepth(10001);
        this.restartTxt = this.scene.add.
            text(CONFIG.screen.width / 2, CONFIG.screen.height / 2 + 100, "Restart", CONFIG.defaultTextStyle).setFontSize(24)
            .setOrigin(0.5, 0.5).setVisible(false).setDepth(10001);

    }

    gameOver = (hasWon = true) => {
        this.bgPanel.setVisible(true);
        this.gameOvertext.setVisible(true);
        this.gameOvertext.text = hasWon ? "YOU WON!" : "YOU LOST!";
        this.gameOvertext.setColor = hasWon ? Colors.Green : Colors.Red;
        this.restartButton.setVisible(true);
        this.restartTxt.setVisible(true);
    }

    hideUI = () => {
        this.bgPanel.setVisible(false);
        this.gameOvertext.setVisible(false);
        this.restartButton.setVisible(false);
        this.restartTxt.setVisible(false);
    }
}