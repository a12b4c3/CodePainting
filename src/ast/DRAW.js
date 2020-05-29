import Tokenizer from "../libs/tokenizer.js";
import ELEMENT from "./ELEMENT.js";
import IPARAMETER from "./IPARAMETER.js";
import IMG from "./IMG.js";


class DRAW{
    _elements =[]; //list of drawing operations

    parse(){
        console.log("I am parsing drawing");
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.getNext(); //"{"

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

    evaluate(mainCanvas, varTable) {
        console.log("I am gonna drawing ");
        for(let i = 0; i < this._elements.length; i++) {
            let e = this._elements[i];
            if(e instanceof IMG) {
                e.evaluate(mainCanvas, varTable);
            } else {
                e.evaluate(mainCanvas);
            }
        }
    }

}

export default DRAW;