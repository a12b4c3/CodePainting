/**
 OParameter class
 **/

import {ThrowInvalidOperationParameterError} from "../libs/ErrorMsgWriter.js";
import REPEATHORIZONTALLY from "./OPERATORS/REPEATHORIZONTALLY.js";
import REPEATVERTICALLY from "./OPERATORS/REPEATVERTICALLY.js";

class OPARAMETER {

    getOp(operator){
        if (operator === "repeathorizontally") {
            return new REPEATHORIZONTALLY();

        } else if (operator === "repeatvertically") {
            return new REPEATVERTICALLY();
        } else {
             ThrowInvalidOperationParameterError(tok);
        }

    }

}

export default OPARAMETER;