/**
 Text class
 **/
import Tokenizer from "../libs/tokenizer.js";
import TPARAMETER from "./TPARAMETER.js";
import DynamicCanvas from "../libs/DynamicCanvas.js";
import {ThrowInvalidOperationParameterError} from "../libs/ErrorMsgWriter.js";
import REPEATHORIZONTALLY from "./OPERATORS/REPEATHORIZONTALLY.js";
import REPEATVERTICALLY from "./OPERATORS/REPEATVERTICALLY.js";


class TEXT {
    _textParameter; // TPARAMETER
    _operations = []; // OPERATION[]

    /**
     * Override function
     * parse
     */
    parse(){
        console.log("I am parsing text");
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.checkToken("(");

        while(!tokenizer.checkToken(")")){
            this._textParameter = new TPARAMETER();
            this._textParameter.parse();
        }
        tokenizer.getNext();

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
    evaluate(mainCanvas) {
        const dcanvas = DynamicCanvas.getDCanvas();
        const dcontext = DynamicCanvas.getDContext();
        this._textParameter.evaluate(mainCanvas);
        for(let i = 0; i < this._operations.length; i++) {
            this._operations[i].evaluate();
            DynamicCanvas.mergeToCanvas(mainCanvas.getContext('2d'));

        }
        DynamicCanvas.mergeToCanvas(mainCanvas.getContext('2d'));
    }
}

export default TEXT;