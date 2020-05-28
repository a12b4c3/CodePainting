/* art parameters
 * parameter            default
 * linecolor            black
 * linewidth            1 point
 * backgroundcolor      none
 * x                    0
 * y                    0
 * w
 * h
 * rotation
 */
/**
 AParameter class
 **/
import Tokenizer from "../libs/tokenizer.js";
import {ThrowInvalidArtParameterError} from "../libs/ErrorMsgWriter.js";
import DynamicCanvas from "../libs/DynamicCanvas.js";
import {DegToRad} from "../libs/MathUtils.js";

class APARAMETER {
    _shapename = "undef"    // rectangle or circle
    _linecolor = "black";   // string (html named colors)
    _linewidth = 3;         // int (pixels)
    _backgroundcolor = 'undef';  // string (html named colors)
    _x = 0;                 // int (x-dim)
    _y = 0;                 // int (y-dim)
    _w = 100;               // int (pixels)
    _h = 100;               // int (pixels)
    _rotation = 0;          // int (rad)


    /**
     * Override function
     * parse
     */
    parse() {
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.getAndCheckNext("(");

        while (!tokenizer.checkToken(")")) {
            let tok = tokenizer.getNext();
            if (tok === "shapename") {
                tokenizer.getAndCheckNext("=");
                this._shapename = tokenizer.getNext();
            } else if (tok === "linecolor") {
                tokenizer.getAndCheckNext("=");
                this._linecolor = tokenizer.getNext();
            } else if (tok === "linewidth") {
                tokenizer.getAndCheckNext("=");
                this._linewidth = tokenizer.getNext();
            } else if (tok === "fillcolor") {
                tokenizer.getAndCheckNext("=");
                this._backgroundcolor = tokenizer.getNext();
            } else if (tok === "x") {
                tokenizer.getAndCheckNext("=");
                this._x = Number(tokenizer.getNext());
            } else if (tok === "y") {
                tokenizer.getAndCheckNext("=");
                this._y = Number(tokenizer.getNext());
            } else if (tok === "w") {
                tokenizer.getAndCheckNext("=");
                this._w = Number(tokenizer.getNext());
            } else if (tok === "h") {
                tokenizer.getAndCheckNext("=");
                this._h = Number(tokenizer.getNext());
            } else if (tok === "rotation") {
                tokenizer.getAndCheckNext("=");
                this._rotation = DegToRad(tokenizer.getNext());
            } else {
                ThrowInvalidArtParameterError(tok);
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
        dcontext.strokeStyle = this._linecolor;
        dcontext.lineWidth = this._linewidth;
        dcontext.fillStyle = this._backgroundcolor;

        if (this._shapename === "circle") {
            dcontext.beginPath();
            dcontext.ellipse(this._x, this._y, this._w, this._h, this._rotation, 0, 2 * Math.PI)
        } else if (this._shapename === "rectangle") {
            dcontext.beginPath();
            dcontext.moveTo(this._x, this._y);
            dcontext.lineTo(this._x + this._w, this._y);
            dcontext.lineTo(this._x + this._w, this._y + this._h);
            dcontext.lineTo(this._x, this._y + this._h);
            dcontext.lineTo(this._x, this._y);
        } else {
            ThrowInvalidArtParameterError("Shapename: " + this._shapename);
        }
        dcontext.stroke();
        dcontext.fill();
    }
}

export default APARAMETER;