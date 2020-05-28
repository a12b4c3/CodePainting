import Tokenizer from "../../libs/tokenizer.js";
import {ThrowInvalidOperationParameterError} from "../../libs/ErrorMsgWriter.js";
import DynamicCanvas from "../../libs/DynamicCanvas.js";

class REPEATVERTICALLY {
    _spacing = 10;
    _repeat =5;

    parse() {
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.getAndCheckNext("(");

        while(!tokenizer.checkToken(")")) {
            let tok = tokenizer.getNext();
            if (tok === "spacing") {
                tokenizer.getAndCheckNext("=");
                this._spacing = tokenizer.getNext();
            } else if (tok === "repeat") {
                tokenizer.getAndCheckNext("=");
                this._repeat = tokenizer.getNext();
            } else {
                ThrowInvalidOperationParameterError(tok);
            }
        }
        tokenizer.getNext();
    }

    evaluate(mainCanvas) {
        const dcontext = DynamicCanvas.getDContext();
        const ogDynamicCanvas = DynamicCanvas.cloneCanvas(dcontext.canvas);
        let next_y = Number(this._spacing);
        for (let i = 0; i < this._repeat; i++) {
            dcontext.drawImage(ogDynamicCanvas, 0, next_y, 700, 700);
            next_y = next_y + Number(this._spacing);
        }

    }

}

export default REPEATVERTICALLY;