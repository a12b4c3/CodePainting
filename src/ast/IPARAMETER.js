/**
IParameter class
 **/

import {ThrowInvalidArtParameterError} from "../libs/ErrorMsgWriter.js";
import Tokenizer from "../libs/tokenizer.js";
import {ThrowInvalidImgParameterError} from "../libs/ErrorMsgWriter.js";

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
    parse(){
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
    evaluate() {
        let xLocal = this._x;
        let yLocal = this._y;
        let canvas = document.getElementById('canvas').getContext('2d');
        let img = new Image();
        canvas.rotate(this._rotation * Math.PI / 180);
        img.onload = function() {
            canvas.drawImage(img, xLocal, yLocal, 100, 100); // scale 1: 100?
        };
        img.src = "images/" + this._name + ".svg";
    }
}

export default IPARAMETER;