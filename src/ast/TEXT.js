/**
 Text class
 **/
import Tokenizer from "../libs/tokenizer.js";
import TPARAMETER from "./TPARAMETER.js";
import REPEATHORIZONTALLY from "./OPERATORS/REPEATHORIZONTALLY.js";
import REPEATVERTICALLY from "./OPERATORS/REPEATVERTICALLY.js";
import {ThrowInvalidOperationParameterError} from "../libs/ErrorMsgWriter.js";
import DynamicCanvas from "../libs/DynamicCanvas.js";
import OPARAMETER from "./OPARAMETER.js";


class TEXT {
    _textParameter
    _operations = [];


    /**
     * Override function
     * parse
     */
    parse(){
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.checkToken("(");

        this._textParameter = new TPARAMETER();
        this._textParameter.parse();

        // while "@" is not hit, there are still more operations for
        // this element.
        while(!tokenizer.checkToken("@") && tokenizer.moreTokens() && !tokenizer.checkToken("}")) {
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
    evaluate(mainCanvas) {
        const dcanvas = DynamicCanvas.getDCanvas();
        const dcontext = DynamicCanvas.getDContext()
        this._textParameter.evaluate(mainCanvas);
        for(let i = 0; i < this._operations.length; i++) {
            this._operations[i].evaluate();
        }
        DynamicCanvas.mergeToCanvas(mainCanvas.getContext('2d'));
    }
}

export default TEXT;