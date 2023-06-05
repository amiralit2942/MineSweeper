import Phaser from "phaser";
import { CONFIG } from "./config";
import { GameScene } from "./scenes/game";
export const createGame = () => {
    window.onload = () => {
        // Phaser.GameObjects.Text = MyText;
        new Phaser.Game({
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: CONFIG.screen.width,
                height: CONFIG.screen.height,
            },
            // background color (black)
            backgroundColor: 0x000000,
            // scene to play
            scene: [GameScene],
            // physics settings
            physics: {
                default: "arcade",
                arcade: {
                    debug: CONFIG.debug,
                    // gravity settings
                    gravity: {
                        x: 0,
                        y: 10,
                    }
                }
            },
            parent: 'game',
        });
        window.focus();
    };
}
