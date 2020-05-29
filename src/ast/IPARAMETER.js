/**
IParameter class
 **/

import {ThrowInvalidImgParameterError} from "../libs/ErrorMsgWriter.js";
import Tokenizer from "../libs/tokenizer.js";
import DynamicCanvas from "../libs/DynamicCanvas.js";

class IPARAMETER {
    _x = 0;         // x-dim - pixels
    _y = 0;         // y-dim - pixels
    _scale = 1;     // int - scaling factor
    _rotation = 0;  // int - deg
    _name = "";     // filename, String
    _varname = "";  // variable name, String


    /**
     * Override function
     * parse
     */
    parse(){
        const tokenizer = Tokenizer.getTokenizer();
        tokenizer.getAndCheckNext("(");

        while (!tokenizer.checkToken(")")) {
            let tok = tokenizer.getNext();
            if (tok === "name") {
                tokenizer.getAndCheckNext("=");
                this._name = tokenizer.getNext();
            } else if (tok === "varname"){
                tokenizer.getAndCheckNext("=");
                this._varname = tokenizer.getNext();
            } else if (tok === "x") {
                tokenizer.getAndCheckNext("=");
                this._x = tokenizer.getNext();
            } else if (tok === "y") {
                tokenizer.getAndCheckNext("=");
                this._y = tokenizer.getNext();
            } else if (tok === "rotation") {
                tokenizer.getAndCheckNext("=");
                this._rotation = tokenizer.getNext();
            } else if (tok === "scale") {
                tokenizer.getAndCheckNext("=");
                this._scale = tokenizer.getNext();
            } else {
                ThrowInvalidImgParameterError(tokenizer.getNext());
            }
        }
    }

    /**
     * Override function
     * evaluate
     */
   async evaluate(mainCanvas, varTable) {
        const dcontext = DynamicCanvas.getDContext();
        DynamicCanvas.clearDContext();
        // mainCanvas.getContext('2d').fillStyle = "black";
        // let img = new Image();
        // img.src = "../images/" + this._name + ".svg";
        // dcontext.drawImage(img, this._x, this._y);
        let loadedImg = new Image();

        if(this._varname === "") {
            loadedImg.onload = function (){
                dcontext.drawImage(loadedImg, this._x, this._y, this._scale * 10, this._scale * 10);
            };
            loadedImg.src = "images/" + this._name + ".svg";
        } else if(this._name === "") {
            let index = varTable.find(element => element._name === this._varname);
            if(index === undefined) {
                throw new Error(this._varname + "is not in the var Table");
            }
            let urlData = index._owncanvas.toDataURL("image/png");
            loadedImg.onload = function (){
                dcontext.drawImage(loadedImg, this._x, this._y, this._scale * 10, this._scale * 10);
            };
            loadedImg.src = urlData;
        }

     /** await this.drawImg(dcontext,loadedImg)
          .then(()=>{
              dcontext.drawImage(loadedImg, this._x, this._y, this._scale * 10, this._scale * 10);
              console.log(loadedImg.src);
          });**/
     console.log("PLEASE helpme");
    }

    async drawImg(dcontext,img) {
       return new Promise(resolve => {
           img.onload = function () {
               console.log("loaded");
               resolve();
           }
       });
    }
}

export default IPARAMETER;