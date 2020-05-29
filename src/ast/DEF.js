import Tokenizer from "../libs/tokenizer.js";
import ELEMENT from "./ELEMENT.js";
import DynamicCanvas from "../libs/DynamicCanvas.js";
import IPARAMETER from "./IPARAMETER.js";
import IMG from "./IMG.js";


class DEF{
    _name;
    _elements=[];
    _owncanvas;

    parse(){
        const tokenizer = Tokenizer.getTokenizer();
        this._name = tokenizer.getNext();
        tokenizer.getNext(); // { will be gone

        while(tokenizer.moreTokens() && !tokenizer.checkToken("}")) {
            let element = tokenizer.getNext();
            let e = new ELEMENT();
            let s = e.getELE(element);
            s.parse();

            if (s.constructor.name !== "BACKGROUND") {
                this._elements.push(s);
            } else {
                this._elements.unshift(s);
            }
            // end of one element and its operations
            if(tokenizer.checkToken("@")) {
                tokenizer.getAndCheckNext("@");
            }
        }

        tokenizer.getAndCheckNext("}");
    }

    evaluate(varTable){
        console.log("I am put " + this._name + "in to varTable");
        const dcontext = DynamicCanvas.getDContext();
        const tmpCanvas = DynamicCanvas.cloneCanvas(dcontext.canvas);
        for(let i =0; i<this._elements.length;i++) {
            let e = this._elements[i];
            if(e instanceof IMG) {
                e.evaluate(tmpCanvas, varTable);
            } else {
                e.evaluate(tmpCanvas);
            }
        }
        this._owncanvas = tmpCanvas;
        varTable.push(this);
    }
}

export default DEF;