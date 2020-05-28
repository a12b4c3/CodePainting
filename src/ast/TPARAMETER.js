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
        const mainContext = mainCanvas.getContext('2d');
        const dcontext = DynamicCanvas.getDContext()
        DynamicCanvas.clearDContext();
        mainContext.font = this._fontsize + "px " + this._font;
        mainContext.fillStyle = this._fillcolor;
        let textwidth = () => {
            let totalwidth = 0;
            for (let i=0; i < this._comment.length; i++) {
                totalwidth += Math.round(mainContext.measureText(this._comment[i]).width);
            }
            return totalwidth;
        };
        const textheight = this._fontsize * 1.5;
        mainContext.fillRect(this._x, this._y, textwidth, textheight);
        mainContext.fillStyle = this._fontcolor;
        mainContext.fillText(this._comment, this._x, this._y);
    }
}

export default TPARAMETER;