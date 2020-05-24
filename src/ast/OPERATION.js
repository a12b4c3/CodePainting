/**
 Operation class
 **/
import tokenizer from "../libs/tokenizer";

class OPERATION extends Node {

    constructor(name) {
        super();
        this.name = name;
        this.list = [];
    }

    /**
     * Override function
     * parse
     */
    parse(tokenizer){
        if(this.name === "scatter"){
            return
        } else if( this.name === "repeathorizontally"|| this.name === "repeatvertically") {
           let s =null;
           tokenizer.getAndCheckNext("(");
           while(!tokenizer.getAndCheckNext(")")){
               s = new OPARAMETER();
               s.parse(tokenizer);
               this.list.push(s);
           }
        } else{
            throw new Error("invalid input");
        }

    }

    /**
     * Override function
     * evaluate
     */
    evaluate() {
    }
}// calls operators from ./operators/
// each operator has its own parser