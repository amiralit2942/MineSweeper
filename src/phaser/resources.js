import Phaser from "phaser";
export const Textures = {
    //general
    Wallet: 'wallet',
    White: 'white',
    Red: 'red',
    Hamburger: 'hamburger',
    Cancel: 'cancel',
    YellowButton: 'yellow-button',
    RedFlag: 'redFlag',
    Black: 'black',
    PushedButton: 'pushedButton',
    UnpushedButton: 'unpushedButton',
    Smile: 'smile',
    Glasses: 'sunGlass',
    Skull: 'skull'
}
export const MyScenes = {
    Game: 'game',
    Disclaimer: 'disclaimer',
    ChooseQueue: 'choose_queue',
    InQueue: 'in_queue',
}
export const TexturePath = {
    get: (texture) => {
        // switch (texture) {
        //     case (Textures.Ball):
        //         return 'assets/ball.png';
        //     case (Textures.YellowButton):
        //         return 'assets/yellow-button.png';
        //     case (Textures.Dialog):
        //         return 'assets/dialog.png';
        //     case (Textures.White):
        //         return 'assets/white.png';
        // }
        return 'assets/' + texture + '.png';
    }
}
export const loadTexture = (scene = new Phaser.Scene(), texture = Textures.Ball) => {
    return scene.load.image(texture, TexturePath.get(texture));
}
export const Colors = {
    Primary: 0x2A3449,
    PrimaryLight: 0x4A586D,
    White: 0xffffff,
    Red: 0xD81239,
    Yellow: 0xFFB801,
    Green: 0x67ff00,
    /**
     * 
     * @param {Phaser.Display.Color} color 
     */
    ToHex: (color) => {
        color = Phaser.Display.Color.IntegerToColor(color);
        return Phaser.Display.Color.RGBToString(color.red, color.green, color.blue, color.alpha);
    }
}