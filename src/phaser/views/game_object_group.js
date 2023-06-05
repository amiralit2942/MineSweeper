import { CONFIG } from "../config";
import { GameScene } from "../scenes/game";

export class GameObjectGroup {

    constructor(scene = new GameScene, x = CONFIG.screen.width, y = CONFIG.screen.height) {

        this.scene = scene;
        this.groupX = x;
        this.groupy = y;
        this.gameObjects = [];
        this.positions = [];
    }


    addObject = (gameObject, x = 0, y = 0) => {
        this.gameObjects.push[gameObject];
        this.positions.push[{ x: x, y: y }]
    }

    updatePoses = () => {
        for (i = 0; i < this.gameObjects.length; i++) {

        }
    }
}
