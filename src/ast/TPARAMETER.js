/**
 TParameter class
 **/
import Tokenizer from "../libs/tokenizer.js";
import {ThrowInvalidArtParameterError} from "../libs/ErrorMsgWriter.js";
import {ThrowInvalidTextParameterError} from "../libs/ErrorMsgWriter.js";

class TPARAMETER {
    _font = "calibri";      // font-name
    _fontsize = 12;         // int, pixel
    _fontcolor = "black";    // string, html color
    _backgroundcolor = "";   // string, html color
    _rotation = 0;           // int, degree
    _comment;

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
                this._fontsize = tokenizer.getNext();
            } else if (tok === "fontcolor") {
                tokenizer.getAndCheckNext("=");
                this._fontcolor = tokenizer.getNext();
            } else if (tok === "backgroundcolor") {
                tokenizer.getAndCheckNext("=");
                this._backgroundcolor = tokenizer.getNext();
            } else if (tok === "rotation") {
                tokenizer.getAndCheckNext("=");
                this._rotation = tokenizer.getNext();
                this._rotation *= Math.PI / 180;
            } else if (tok === "comment") {
                tokenizer.getAndCheckNext("=");
                this._comment = tokenizer.getNext();
            } else {
                ThrowInvalidTextParameterError(tokenizer.getNext());
            }
        }
    }

    /**
     * Override function
     * evaluate
     */
    evaluate() { // TODO: need to implement
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.font = this._font + this._fontsize.toString(10);
        ctx.fillText(this._comment, 0, 0);
    }
}

export default TPARAMETER;