/**
 Program class
 **/

import Tokenizer from "../libs/tokenizer.js";
import ART from "../ast/ART.js";
import IMG from "../ast/IMG.js";
import TEXT from "../ast/TEXT.js";

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
            } else if(element === "img"){
                s = new IMG();
            } else if (element === "text"){
                s = new TEXT();
            } else {
                throw new Error("invalid inputs");
            }
            s.parse(tokenizer);
            this._elements.push(s);
            // end of one element and its operations
            tokenizer.getAndCheckNext("@");
        }
    }

    /**
     * Override function
     * evaluate
     */
    evaluate(mainCanvas) {
        for(let i = 0; i < this._elements.length; i++) {
            let element = this._elements[i];
            element.evaluate(mainCanvas);
        }
    }
}

export default PROGRAM;