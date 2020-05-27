/**
 Art class
 **/
import Tokenizer from "../libs/tokenizer.js";
import APARAMETER from "./APARAMETER.js";
import REPEATHORIZONTALLY from "./OPERATORS/REPEATHORIZONTALLY.js";
import REPEATVERTICALLY from "./OPERATORS/REPEATVERTICALLY.js";
import {ThrowInvalidOperationParameterError} from "../libs/ErrorMsgWriter.js";

class ART {
    _artParameter; // APARAMETER
    _operations = []; // OPERATION[]

    /**
     * Override function
     * parse
     */
    parse(){
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.checkToken("(");

        this._artParameter = new APARAMETER();
        this._artParameter.parse();

        // while "@" is not hit, there are still more operations for
        // this element.
        while(!tokenizer.checkToken("@") && tokenizer.moreTokens()) {
            tokenizer.getAndCheckNext(".");
            let tok = tokenizer.getNext();
            let o;
            if (tok === "repeathorizontally") {
                o = new REPEATHORIZONTALLY();
                o.parse();
            } else if (tok === "repeatvertically") {
                o = new REPEATVERTICALLY();
                o.parse();
            } else {
                ThrowInvalidOperationParameterError(tok);
            }
            this._operations.push(o);
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