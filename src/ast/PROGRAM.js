/**
 Program class
 **/
import tokenizer from "../libs/tokenizer";

class PROGRAM extends Node {

    constructor() {
        super();
        this.list = [];
    }

    /**
     * Override function
     * parse
     */
    parse(tokenizer){
        while(tokenizer.moreTokens()){
            let element = tokenizer.getNext();
            let s = null;
            if(element === "art"){
                s = new ART();
            }
            else if(element === "img"){
                s = new IMG();
            }
            else if (element === "text"){
                s = new TEXT();
            }
            else if (element === "."){
                let op = tokenizer.getNext();
                s = new OPERATION(op);
            }
            else {
                throw new Error("invalid inputs");
            }
            s.parse(tokenizer);
            this.list.push(s);
        }
    }

    /**
     * Override function
     * evaluate
     */
    evaluate() {
    }
}