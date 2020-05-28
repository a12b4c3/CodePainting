/**
IParameter class
 **/

import {ThrowInvalidArtParameterError} from "../libs/ErrorMsgWriter.js";
import Tokenizer from "../libs/tokenizer.js";
import {ThrowInvalidImgParameterError} from "../libs/ErrorMsgWriter.js";
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
    evaluate(mainCanvas) {
        // const dcontext = DynamicCanvas.getDContext();
        // DynamicCanvas.clearDContext();
        let dcontext = document.getElementById('canvas').getContext('2d');
        let xLocal = 200;
        let yLocal = this._y;

        let img = new Image();
        dcontext.rotate(this._rotation);
        img.src = "images/" + this._name + ".svg";
        img.onload = function() {
            let next_x = xLocal;
            for (let i = 0; i < 5; i++) {
                dcontext.drawImage(img, next_x, yLocal, 100, 100); // scale 1: 100?
                next_x = next_x + 100;
            }
        };
    }
}

export default IPARAMETER;