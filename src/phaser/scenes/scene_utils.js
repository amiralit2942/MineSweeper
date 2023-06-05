import { CONFIG } from "../config";
import { MyScenes } from "../resources";
import { GameScene } from "./game";

/**
 * 
 * @param {Phaser.Scene} currentScene 
 * @returns {GameScene}
 */
export function getGameScene(currentScene) {
    return currentScene.scene.get(MyScenes.Game);
}
/**
 * 
 * @param {Phaser.Scene} scene 
 * @returns {Phaser.GameObjects.Graphics}
 */
export function drawHalfScreenLines(scene) {
    let graphics = scene.add.graphics();
    graphics.lineBetween(CONFIG.screen.width / 2, 0, CONFIG.screen.width / 2, CONFIG.screen.height);
    graphics.lineStyle(1, 0xaa0000);
    graphics.setDepth(9999);
    return graphics;
}
/**
 * 
 * @param {Phaser.Scene} scene 
 * @returns {Phaser.GameObjects.Graphics}
 */
export function drawDebugPoint(scene, x = 0, y = 0, radius = 5, color = 0xaa0000) {
    let graphics = scene.add.graphics();
    graphics.fillCircle(x, y, radius);
    graphics.fillStyle(color)
    graphics.setDepth(9999);
    return graphics;
}
/**
 * 
 * @param {Phaser.Scene} scene 
 * @returns {Phaser.GameObjects.Graphics}
 */
export function drawDebugRect(scene, x = 0, y = 0, width = 100, height = 100, color = 0xaa0000, alpha = 0.5) {
    let graphics = scene.add.graphics();
    graphics.fillStyle(color, alpha);
    graphics.fillRect(x, y, width, height);
    graphics.setDepth(9999);
    return graphics;
}