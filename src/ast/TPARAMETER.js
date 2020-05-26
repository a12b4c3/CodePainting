/**
 TParameter class
 **/
import tokenizer from "../libs/tokenizer";

class TPARAMETER extends Node {
    _font = "calibri";      // font-name
    _fontsize = 12;         // int, pixel
    _fontcolor = "black"    // string, html color
    _backgroundcolor = ""   // string, html color
    _rotation = 0           // int, degree

    constructor(name) {
        super();
        this.name = name;
        this.value = -1;
    }

    /**
     * Override function
     * parse
     */
    parse(tokenizer){
        tokenizer.getAndCheckNext("=");
        this.value = tokenizer.getNext();
    }

    /**
     * Override function
     * evaluate
     */
    evaluate() {
    }
}