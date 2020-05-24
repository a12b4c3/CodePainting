/**
IParameter class
 **/
import tokenizer from "../libs/tokenizer";

class IParameter extends Node {

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