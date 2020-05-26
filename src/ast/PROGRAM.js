/**
 Program class
 **/

import Tokenizer from "../libs/tokenizer.js";
import ART from "../ast/ART.js";
import IMG from "../ast/IMG.js";

class PROGRAM {
    _elements;

    constructor() {
        this._elements = [];
    }

    /**
     * Override function
     * parse
     */
    parse(){
        const tokenizer = Tokenizer.getTokenizer();
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
            this._elements.push(s);
        }
    }

    /**
     * Override function
     * evaluate
     */
    evaluate() {
    }
}

export default PROGRAM;