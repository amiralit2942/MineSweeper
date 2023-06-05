class MyText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        if (style == undefined)
            style = {};
        if (style.fontFamily == undefined)
            style.fontFamily = 'integral';
        console.log(`myText=>`, style);
        super(scene, x, y, text, style);
    }
}
module.exports = { MyText };