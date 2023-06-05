import { CONFIG } from "../config";
import { GameScene } from "../scenes/game";

export class HtmlUtil {
    constructor(scene = new GameScene, /*config*/) {
        //super();
        this.scene = scene;
        //get the game height and width
        this.gameWidth = CONFIG.screen.width;
        this.gameHeight = CONFIG.screen.height;
        // this.alignGrid = new AlignGrid({
        //     scene: this.scene,
        //     rows: config.rows,
        //     cols: config.cols
        // });
    }
    showNumbers() {
        this.alignGrid.showNumbers();
    }
    scaleToGameW(elName, per) {
        var el = document.getElementById(elName);
        var w = this.gameWidth * per;
        el.style.width = w + "px";
    }
    scaleToGameH(elName, per) {
        var el = document.getElementById(elName);
        var h = this.gameHeight * per;
        el.style.height = h + "px";
    }
    placeElementAt(elName, x = 0, y = 0) {

        var x = x;
        var y = y;
        //get the element
        var el = document.getElementById(elName);
        //set the position to absolute
        el.style.position = "absolute";
        //get the width of the element
        var w = el.style.width;
        //convert to a number
        w = this.toNum(w);
        //
        //
        //center horizontal in square if needed
        // if (centerX == true) {
        //     x -= w / 2;
        // }
        //
        //get the height
        //        
        var h = el.style.height;
        //convert to a number
        h = this.toNum(h);
        //
        //center verticaly in square if needed
        //
        // if (centerY == true) {
        //     y -= h / 2;
        // }
        //set the positions
        el.style.top = y + "px";
        el.style.left = x + "px";
    }
    //changes 100px to 100
    toNum(s) {
        s = s.replace("px", "");
        s = parseInt(s);
        return s;
    }
    //add a change callback
    addChangeCallback(elName, fun, scope = null) {
        var el = document.getElementById(elName);
        if (scope == null) {
            el.onchange = fun;
        } else {
            el.onchange = fun.bind(scope);
        }
    }
    getTextAreaValue(elName) {
        var el = document.getElementById(elName);
        return el.value;
    }
    getTextValue(elName) {
        var el = document.getElementById(elName);
        return el.innerText;
    }
    hideElement(elName) {
        var el = document.getElementById(elName);
        el.style.display = "none";
    }
    showElement(elName) {
        var el = document.getElementById(elName);
        el.style.display = "block";
    }
}