/**
 Img class
 **/
import Tokenizer from "../libs/tokenizer.js";
import IPARAMETER from "./IPARAMETER.js";
import DynamicCanvas from "../libs/DynamicCanvas.js";
import REPEATHORIZONTALLY from "./OPERATORS/REPEATHORIZONTALLY.js";
import REPEATVERTICALLY from "./OPERATORS/REPEATVERTICALLY.js";
import {ThrowInvalidOperationParameterError} from "../libs/ErrorMsgWriter.js";

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

        while(!tokenizer.checkToken("@") && tokenizer.moreTokens() && !tokenizer.checkToken("}")) {
            console.log("parsing operator.");
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
// img(name=star/heart x=10 y=10 scale=1)
    evaluate(mainCanvas) {
        const dcanvas = DynamicCanvas.getDCanvas();
        const dcontext = DynamicCanvas.getDContext();
        let draw = (async ()=> {await this._imgParameter.evaluate(mainCanvas);})
        draw().then(()=> {
            for(let i = 0; i < this._operations.length; i++) {
                this._operations[i].evaluate(mainCanvas);
            }
            DynamicCanvas.mergeToCanvas(mainCanvas.getContext('2d'));
        }).catch(() => {
            console.log("couldn't load the image");
        });
    }
}

export default IMG;