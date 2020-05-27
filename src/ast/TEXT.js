/**
 Text class
 **/
import Tokenizer from "../libs/tokenizer.js";
import TPARAMETER from "./TPARAMETER.js";


class TEXT {
    _textParameter;


    /**
     * Override function
     * parse
     */
    parse(){
        console.log("I am parsing text")
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.checkToken("(");

        while(!tokenizer.checkToken(")")){
            this._textParameter = new TPARAMETER();
            this._textParameter.parse();
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

export default TEXT;