
import Tokenizer from "../libs/tokenizer.js";
import {canvas_width, canvas_height} from "../scripts/main.js";

class BACKGROUND {
    _color;

    constructor() {
        this._color = undefined;
    }

    parse() {
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.getAndCheckNext("(");
        tokenizer.getAndCheckNext("color");
        tokenizer.getAndCheckNext("=");
        this._color = tokenizer.getNext();
        tokenizer.getNext();
    }

    evaluate(mainCanvas) {
        const mainContext = mainCanvas.getContext('2d');
        if (this._color === undefined) {
            mainContext.clearRect(0,0,canvas_width,canvas_height);
        } else {
            mainContext.fillStyle = this._color;
            mainContext.fillRect(0,0,canvas_width,canvas_height);
        }
    }
}

export default BACKGROUND;