/**
 Art class
 **/
import Tokenizer from "../libs/tokenizer.js";
import APARAMETER from "./APARAMETER.js";

class ART {
    _artParameter; // APARAMETER

    /**
     * Override function
     * parse
     */
    parse(){
        console.log("I am parsing art")
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.checkToken("(");

        while(!tokenizer.checkToken(")")){
            this._artParameter = new APARAMETER();
            this._artParameter.parse();
        }
        tokenizer.getNext();
    }

    /**
     * Override function
     * evaluate
     */
    evaluate() {
    }
}

export default ART;