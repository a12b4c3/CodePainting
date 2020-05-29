import Tokenizer from "../libs/tokenizer.js";
import ELEMENT from "./ELEMENT.js";

class DEF{
    _name;
    _elements=[];

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
        varTable.push(this);
    }
}

export default DEF;