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

class APARAMETER {
    _shapename = ""             // rectangle or circle
    _linecolor = "black";   // string (html named colors)
    _linewidth = 3;         // int (pixels)
    _backgroundcolor = 'undef';  // string (html named colors)
    _x = 0;                 // int (x-dim)
    _y = 0;                 // int (y-dim)
    _w = 100;               // int (pixels)
    _h = 100;               // int (pixels)
    _rotation = 0;          // int (degrees)


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
            } else if (tok === "backgroundcolour") {
                tokenizer.getAndCheckNext("=");
                this._backgroundcolor = tokenizer.getNext();
            } else if (tok === "x") {
                tokenizer.getAndCheckNext("=");
                this._x = tokenizer.getNext();
            } else if (tok === "y") {
                tokenizer.getAndCheckNext("=");
                this._y = tokenizer.getNext();
            } else if (tok === "w") {
                tokenizer.getAndCheckNext("=");
                this._w = tokenizer.getNext();
            } else if (tok === "h") {
                tokenizer.getAndCheckNext("=");
                this._h = tokenizer.getNext();
            } else if (tok === "rotation") {
                tokenizer.getAndCheckNext("=");
                this._rotation = tokenizer.getNext();
            } else {
                ThrowInvalidArtParameterError(tokenizer.getNext());
            }
        }
    }

    /**
     * Override function
     * evaluate
     */
    evaluate() {

    }
}

export default APARAMETER