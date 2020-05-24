/**
 Text class
 **/
import tokenizer from "../libs/tokenizer";

class TEXT extends Node {

    constructor() {
        super();
        this.list = [];
    }

    /**
     * Override function
     * parse
     */
    parse(tokenizer){
        tokenizer.getAndCheckNext("(");

        while(!tokenizer.checkNext(")")){
            let s = null;
            let tmp = tokenizer.getNext();
            if(tmp === "font"){ s = new TPARAMETER(tmp); }
            else if(tmp === "fontsize"){ s = new TPARAMETER(tmp); }
            else if(tmp === "fontcolor"){s = new TPARAMETER(tmp);}
            else if(tmp === "backgroundcolor"){s = new TPARAMETER(tmp);}
            else if(tmp === "rotation"){s = new TPARAMETER(tmp);}
            else {
                throw new Error("invalid input");
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