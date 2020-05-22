/**
 @constructor
 @abstract
 base node class
 **/

class Node {

    constructor() {

    if(this.constructor === Node) {
        throw new Error("this is abstract class");
    }


    }

    parse() {
        throw new Error ("this is abstract function");
    }

    evaluate() {
        throw new Error ("this is abstract function");
    }

}