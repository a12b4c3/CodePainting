import Tokenizer from "../libs/tokenizer.js";


class DRAW{
    draw_list=[]; //list of drawing operations

    parse(){
        console.log("I am parsing drawing");
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.getNext(); //"("
        while(!tokenizer.checkToken(")")) {
            let toBeDrawn = tokenizer.getNext();
            console.log(toBeDrawn);
            this.draw_list.push(toBeDrawn);
        }

        tokenizer.getAndCheckNext(")");

    }

    evaluate(mainCanvas, varTable) {
        console.log("I am gonna drawing ");
        for(let i = 0; i < this.draw_list.length; i++) {
            let e = this.draw_list[i];
            let index = varTable.find(element => element._name === e);
            if(index === undefined) {
                throw new Error(e + "is not in the var Table");
            }
            let s = varTable[i];
            for(let j = 0; j <s._elements.length; j++) {
                let ss = s._elements[j];
                ss.evaluate(mainCanvas);
            }

        }
    }

}

export default DRAW;