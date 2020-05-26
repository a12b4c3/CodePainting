/**
IParameter class
 **/
import tokenizer from "../libs/tokenizer";

class IParameter extends Node {
    _x = 0;         // x-dim - pixels
    _y = 0;         // y-dim - pixels
    _scale = 1;     // int - scaling factor
    _rotation = 0;  // int - deg
    _name = "";     // mandatory filename, String

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
        if(this.name === "name"){
            return;
        }
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