/**
 Operation class
 **/
import tokenizer from "../libs/tokenizer";

class Operation extends Node {

    constructor() {
        super();
        this.list = [];
    }

    /**
     * Override function
     * parse
     */
    parse(){
    }

    /**
     * Override function
     * evaluate
     */
    evaluate() {
    }
}// calls operators from ./operators/
// each operator has its own parser