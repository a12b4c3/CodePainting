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
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.checkToken("(");

        while(!tokenizer.checkToken(")")){
            this._artParameter = new APARAMETER();
            this._artParameter.parse();
        }
    }

    /**
     * Override function
     * evaluate
     */
    evaluate() {
    }
}

export default ART