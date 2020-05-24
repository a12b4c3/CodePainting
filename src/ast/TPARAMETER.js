/**
 TParameter class
 **/
import tokenizer from "../libs/tokenizer";

class TPARAMETER extends Node {

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