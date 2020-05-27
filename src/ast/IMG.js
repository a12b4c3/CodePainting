/**
 Img class
 **/
import Tokenizer from "../libs/tokenizer.js";
import IPARAMETER from "./IPARAMETER.js";

class IMG {
    _imgParameter;

    /**
     * Override function
     * parse
     */
    parse(){
        console.log("I am parsing img")
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.checkToken("(");

        while(!tokenizer.checkToken(")")){
            this._imgParameter = new IPARAMETER();
            this._imgParameter.parse();
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

export default IMG;