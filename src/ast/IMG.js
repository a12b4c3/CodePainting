/**
 Img class
 **/
import tokenizer from "../libs/tokenizer";

class IMG extends Node {

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
            if(tmp === "x"){ s = new IPARAMETER(tmp); }
            else if(tmp === "y"){ s = new IPARAMETER(tmp); }
            else if(tmp === "scale"){s = new IPARAMETER(tmp);}
            else if(tmp === "rotation"){s = new IPARAMETER(tmp);}
            else if(tmp === "name"){s = new IPARAMETER(tmp);}
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