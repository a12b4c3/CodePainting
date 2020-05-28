import Tokenizer from "../../libs/tokenizer.js";
import {ThrowInvalidOperationParameterError} from "../../libs/ErrorMsgWriter.js";

class REPEATHORIZONTALLY{
    _spacing = 10;
    _repeat = 5;

    constructor() {
    }

    parse() {
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.getAndCheckNext("(");

        while(!tokenizer.checkToken(")")) {
            let tok = tokenizer.getNext();
            if (tok === "spacing") {
                tokenizer.getAndCheckNext("=");
                this._spacing = tokenizer.getNext();
            } else if (tok === "repeat") {
                tokenizer.getAndCheckNext("=");
                this._repeat = tokenizer.getNext();
            } else {
                ThrowInvalidOperationParameterError(tok);
            }
        }
        tokenizer.getNext();
    }

    evaluate() {
        console.log("repeating horizontally now!");
    }

}

export default REPEATHORIZONTALLY;