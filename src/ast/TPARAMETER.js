/**
 TParameter class
 **/
import Tokenizer from "../libs/tokenizer.js";
import {ThrowInvalidArtParameterError} from "../libs/ErrorMsgWriter.js";
import {ThrowInvalidTextParameterError} from "../libs/ErrorMsgWriter.js";
import DynamicCanvas from "../libs/DynamicCanvas.js";

class TPARAMETER {
    _x = 0;
    _y = 0;
    _font = "calibri";      // font-name
    _fontsize = 12;         // int, pixel
    _fontcolor = "black"    // string, html color
    _fillcolor = ""   // string, html color
    _rotation = 0           // int, degree
    _comment = "typesomething"; // string


    /**
     * Override function
     * parse
     */
    parse(){
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.getAndCheckNext("(");

        while (!tokenizer.checkToken(")")) {
            let tok = tokenizer.getNext();
            if (tok === "font") {
                tokenizer.getAndCheckNext("=");
                this._font = tokenizer.getNext();
            } else if (tok === "fontsize") {
                tokenizer.getAndCheckNext("=");
                this._fontsize = Number(tokenizer.getNext());
            } else if (tok === "fontcolor") {
                tokenizer.getAndCheckNext("=");
                this._fontcolor = tokenizer.getNext();
            } else if (tok === "fillcolor") {
                tokenizer.getAndCheckNext("=");
                this._fillcolor = tokenizer.getNext();
            } else if (tok === "rotation") {
                tokenizer.getAndCheckNext("=");
                this._rotation = tokenizer.getNext();
            } else if (tok === "comment") {
                tokenizer.getAndCheckNext("=");
                this._comment = tokenizer.getNext();
            } else if (tok === "x") {
                tokenizer.getAndCheckNext("=");
                this._x = Number(tokenizer.getNext());
            } else if (tok === "y") {
                tokenizer.getAndCheckNext("=");
                this._y = Number(tokenizer.getNext());
            } else {
                ThrowInvalidTextParameterError(tokenizer.getNext());
            }
        }
        tokenizer.getNext();
    }

    /**
     * Override function
     * evaluate
     */
    evaluate(mainCanvas) {
        const dcontext = DynamicCanvas.getDContext();
        DynamicCanvas.clearDContext();
        dcontext.font = this._fontsize.toString(10) + "px " + this._font;
        dcontext.fillStyle = this._fontcolor;
        dcontext.rotate(this._rotation);
        // TODO: set background color
        dcontext.fillText(this._comment, this._x, this._y);
    }
}

export default TPARAMETER;