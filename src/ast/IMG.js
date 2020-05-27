/**
 Img class
 **/
import Tokenizer from "../libs/tokenizer.js";
import IPARAMETER from "./IPARAMETER.js";
import DynamicCanvas from "../libs/DynamicCanvas.js";

class IMG {
    _imgParameter; // IPARAMETER
    _operations = []; // OPERATION[]

    /**
     * Override function
     * parse
     */
    parse(){
        console.log("I am parsing img");
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
// img(name=star/heart x=10 y=10 scale=1)
    evaluate(mainCanvas) {
        // const dcanvas = new DynamicCanvas();
        this._imgParameter.evaluate();
        // for(let i = 0; i < this._operations.length; i++) {
        //     this._operations[i].evaluate();
        // }
        // dcanvas.mergeToCanvas(mainCanvas);
    }
}

export default IMG;