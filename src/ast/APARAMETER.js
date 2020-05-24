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
import tokenizer from "../libs/tokenizer";

class IPARAMETER extends Node {

    constructor() {
        super(name);
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