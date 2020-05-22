// abstract class

import Tokenizer from "./tokenizer";
export * from 'Node';

export default class Node {

    tokenizer = Tokenizer.getTokenizer();
    writer; //in case you need to write something to a file!

    setWriter(name){
        // TODO: PrintWriter class in js?
        this.writer = new PrintWriter(name, "UTF-8");
    }

    closeWriter(){
        this.writer.close();
    }

    parse() {
        throw new Error("parse() must be implemented.");
    }

    evaluate() {
        throw new Error("evaluate() must be implemented.");
    }

}