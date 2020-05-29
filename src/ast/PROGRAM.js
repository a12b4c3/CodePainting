/**
 Program class
 **/

import Tokenizer from "../libs/tokenizer.js";
import DEF from "./DEF.js";
import DRAW from "./DRAW.js";

class PROGRAM {
    def_elements=[];
    draw_elements=[];


    /**
     * Override function
     * parse
     */
    parse(){
        const tokenizer = Tokenizer.getTokenizer();
        while(tokenizer.moreTokens()){
            let e = tokenizer.getNext();
            console.log("I am parsing this word " + e);
            let s = null;
            if(e === "def") {
                s = new DEF();
                s.parse();
                this.def_elements.push(s);

            } else if (e === "draw") {
                s = new DRAW();
                s.parse();
                this.draw_elements.push(s);
            } else if( e === "@") {
                continue;
            } else {
                throw new Error("invalid inputs " + e);
            }

        }
    }

    /**
     * Override function
     * evaluate
     */
    evaluate(mainCanvas,varTable) {

        for(let i = 0; i < this.def_elements.length; i++) {
            let element = this.def_elements[i];
            element.evaluate(varTable);
        }

        for (let i = 0; i < this.draw_elements.length; i++) {
            let element = this.draw_elements[i];
            element.evaluate(mainCanvas,varTable);
        }
    }
}

export default PROGRAM;