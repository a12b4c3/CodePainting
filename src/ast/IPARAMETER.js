/**
 IParameter class
 **/

import {ThrowInvalidImgParameterError} from "../libs/ErrorMsgWriter.js";
import Tokenizer from "../libs/tokenizer.js";
import DynamicCanvas from "../libs/DynamicCanvas.js";

class IPARAMETER {
    _x = 0;         // x-dim - pixels
    _y = 0;         // y-dim - pixels
    _scale = 1;     // int - scaling factor
    _rotation = 0;  // int - deg
    _name = "";     // mandatory filename, String


    /**
     * Override function
     * parse
     */
    parse() {
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.getAndCheckNext("(");

        while (!tokenizer.checkToken(")")) {
            let tok = tokenizer.getNext();
            if (tok === "name") {
                tokenizer.getAndCheckNext("=");
                this._name = tokenizer.getNext();
            } else if (tok === "x") {
                tokenizer.getAndCheckNext("=");
                this._x = tokenizer.getNext();
            } else if (tok === "y") {
                tokenizer.getAndCheckNext("=");
                this._y = tokenizer.getNext();
            } else if (tok === "rotation") {
                tokenizer.getAndCheckNext("=");
                this._rotation = tokenizer.getNext();
                this._rotation *= Math.PI / 180;
            } else if (tok === "scale") {
                tokenizer.getAndCheckNext("=");
                this._scale = tokenizer.getNext();
            } else {
                ThrowInvalidImgParameterError(tokenizer.getNext());
            }
        }
    }

    /**
     * Override function
     * evaluate
     */
    async evaluate(mainCanvas) {
        const dcontext = DynamicCanvas.getDContext();
        DynamicCanvas.clearDContext();
        // mainCanvas.getContext('2d').fillStyle = "black";
        // let img = new Image();
        // img.src = "../images/" + this._name + ".svg";
        // dcontext.drawImage(img, this._x, this._y);
        let loadedImg = await this._loadImg();
        mainCanvas.getContext('2d').drawImage(loadedImg, 300, 300);
        return loadedImg();
    }

    async _loadImg() {
    let drawn = await (async () => {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = "images/" + this._name + ".svg";
            // dcontext.drawImage(img, this._x, this._y);
            // mainCanvas.getContext('2d').drawImage(img, 300, 300);
            // mainCanvas.getContext('2d').fillRect(100,100,10,10);
        });
    });
    return drawn();
    }
}

export default IPARAMETER;