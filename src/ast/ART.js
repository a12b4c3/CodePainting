/**
 Art class
 **/
import tokenizer from "../libs/tokenizer";

class ART extends Node {

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
            if(tmp === "x"){ s = new APARAMETER(tmp); }
            else if(tmp === "y"){ s = new APARAMETER(tmp); }
            else if(tmp === "w"){s = new APARAMETER(tmp);}
            else if(tmp === "h"){s = new APARAMETER(tmp);}
            else if(tmp === "rotation"){s = new APARAMETER(tmp);}
            else if(tmp === "linecolor"){s = new APARAMETER(tmp);}
            else if(tmp === "linewidth"){s = new APARAMETER(tmp);}
            else if(tmp === "backgroundcolor"){s = new APARAMETER(tmp);}
            else if(tmp === "name"){s = new APARAMETER(tmp);}
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