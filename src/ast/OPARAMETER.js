/**
 OParameter class
 **/
import tokenizer from "../libs/tokenizer";

class OPARAMETER extends Node {

    constructor() {
        super();
    }

    /**
     * Override function
     * parse
     */
    parse(tokenizer){
        this.name= tokenizer.getNext();
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