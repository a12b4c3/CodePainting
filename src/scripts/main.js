import dynamicCanvas from '../libs/DynamicCanvas.js';
import Tokenizer from "../libs/tokenizer.js";
import PROGRAM from "../ast/PROGRAM.js";

// constant definitions
const mainCanvas = document.getElementById('canvas');
const canvas_width = parseInt(mainCanvas.getAttribute('width'));
const canvas_height = parseInt(mainCanvas.getAttribute('height'));
const mainContext = mainCanvas.getContext('2d');
const PAINT_CODE = document.getElementById('paintcode');
const SUBMIT_BUTTON = document.getElementById('submitbutton');
const dCanvas = dynamicCanvas;
const dContext = dynamicCanvas.getDContext();

// listeners
SUBMIT_BUTTON.addEventListener("click", main);

// list of literals
const baseLiterals = ["art", "img", "text", "\\(", "\\)", "\\.", "=", " "];
const artParamLiterals = [];
const textParamLiterals = [];
const imgParamLiterals = [];

// TODO remove this after testing is done
// document.getElementById('paintcode').innerText = "art(shapename='hello' x=10 y=10 w=100 h=100)\n img(name='star' scale=1).repeathorizontally(spacing=10 repeat=10)\n text(comment='hello how are you')";
document.getElementById('paintcode').innerText = "art(shapename='hello' x=23 y=23 w=320 h=330).repeathorizontally(spacing=10 repeat=10).repeatvertically(spacing=100 repeat=30)";


// function definitions
function main() {
    let input_code = PAINT_CODE.value;
    input_code = input_code.toLowerCase();
    console.log("the input code is: " + input_code);
    if (input_code.length > 0) {
        let literals = buildLiteralsList();
        Tokenizer.makeTokenizer(input_code, literals);
        console.log(Tokenizer.getTokenizer().tokens);
        let p = new PROGRAM();
        p.parse();
        p.evaluate(mainCanvas);
    } else {
        alert('No input code, type something!');
    }
}

function buildLiteralsList() {
    const toBuild = [baseLiterals];

    let finalLiteralList = [];
    for (let i = 0; i < toBuild.length; i++) {
        finalLiteralList = finalLiteralList.concat(toBuild[i]);
    }
    return Array.from(new Set(finalLiteralList));
}

function testcode() {
    dCanvas.clearDContext();
    dContext.fillStyle = 'lightsalmon';
    dContext.fillRect(0,0,700,700);
    dCanvas.mergeToCanvas(mainContext, 0,0);

    dCanvas.clearDContext();
    dContext.fillStyle = 'white';
    dContext.fillRect(95,95,400, 370);
    dCanvas.mergeToCanvas(mainContext, 0,0);

    dCanvas.clearDContext();
    dContext.fillStyle = 'red';
    dContext.fillRect(95, 95, 400, 34);
    dContext.fillRect(95, 154, 400, 34);
    dContext.fillRect(95, 219, 400, 34);
    dContext.fillRect(95, 279, 400, 34);
    dContext.fillRect(95, 339, 400, 34);
    dContext.fillRect(95, 399, 400, 34);
    dCanvas.mergeToCanvas(mainContext, 0, 0);

    dCanvas.clearDContext();
    dContext.fillStyle = 'blue';
    dContext.fillRect(95, 95, 240, 280);
    dCanvas.mergeToCanvas(mainContext, 0, 0);

    let img = new Image();
    dCanvas.clearDContext();
    img.onload = function() {
        drawImageToCanvas(img, 100,100,0.05,0,dContext);
        drawImageToCanvas(img, 140,100,0.05,0,dContext);
        drawImageToCanvas(img, 180,100,0.05,0,dContext);
        drawImageToCanvas(img, 220,100,0.05,0,dContext);
        drawImageToCanvas(img, 260,100,0.05,0,dContext);
        drawImageToCanvas(img, 300,100,0.05,0,dContext);

        dCanvas.mergeToCanvas(mainContext);
        dCanvas.mergeToCanvas(mainContext, 0, 80);
        dCanvas.mergeToCanvas(mainContext, 0, 160);
        dCanvas.mergeToCanvas(mainContext, 0, 240);
    }
    img.src = './images/star.svg'
}


// const canvas1 = document.createElement('canvas');
// const ctx1 = canvas1.getContext('2d');
// canvas1.width = parseInt(canvas_width);
// canvas1.height = parseInt(canvas_height);


// clearCanvas(ctx1);
// ctx1.fillStyle = 'lightsalmon';
// ctx1.fillRect(0,0,parseInt(canvas_width), parseInt(canvas_width));
// ctx.drawImage(canvas1, 0, 0);


// clearCanvas(ctx1);
// ctx1.fillStyle = 'white';
// ctx1.fillRect(95,95, 400, 370)
// ctx.drawImage(canvas1, 0, 0);
//
// clearCanvas(ctx1);
// ctx1.fillStyle = 'red';
// ctx1.fillRect(95, 95, 400, 34);
// ctx1.fillRect(95, 154, 400, 34);
// ctx1.fillRect(95, 219, 400, 34);
// ctx1.fillRect(95, 279, 400, 34);
// ctx1.fillRect(95, 339, 400, 34);
// ctx1.fillRect(95, 399, 400, 34);
// ctx.drawImage(canvas1, 0, 0);
//
//
//
// clearCanvas(ctx1);
// ctx1.fillStyle = 'blue';
// ctx1.fillRect(95, 95, 240, 280);
// ctx.drawImage(canvas1, 0, 0);
//
//
//
// let img = new Image();
// img.onload = function() {
//     clearCanvas(ctx1);
//     drawImageToCanvas(img, 100,100,0.05,0,ctx1);
//     drawImageToCanvas(img, 140,100,0.05,0,ctx1);
//     drawImageToCanvas(img, 180,100,0.05,0,ctx1);
//     drawImageToCanvas(img, 220,100,0.05,0,ctx1);
//     drawImageToCanvas(img, 260,100,0.05,0,ctx1);
//     drawImageToCanvas(img, 300,100,0.05,0,ctx1);
//
//     ctx.drawImage(canvas1, 0,0);
//     ctx.drawImage(canvas1, 0, 80);
//     ctx.drawImage(canvas1, 0, 160);
//     ctx.drawImage(canvas1, 0, 240);
// }
// img.src = './images/star.svg'
//
// let img1 = new Image();
// img1.onload = function() {
//     clearCanvas(ctx1);
//     drawImageToCanvas(img1, 120, 140, 0.05, 0, ctx1);
//     drawImageToCanvas(img1, 160, 140, 0.05, 0, ctx1);
//     drawImageToCanvas(img1, 200, 140, 0.05, 0, ctx1);
//     drawImageToCanvas(img1, 240, 140, 0.05, 0, ctx1);
//     drawImageToCanvas(img1, 280, 140, 0.05, 0, ctx1);
//
//     ctx.drawImage(canvas1, 0, 0);
//     ctx.drawImage(canvas1, 0, 80);
//     ctx.drawImage(canvas1, 0, 160);
//
// }
// img1.src = './images/star.svg';




mainContext.translate(100,100);
mainContext.rotate(Math.PI/4);
mainContext.translate(0,0);

mainContext.setTransform(1,0,0,1,0,0);


function drawImageToCanvas(image, x, y, scale, rotation, ccanvas) {
    ccanvas.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ccanvas.rotate(rotation*Math.PI/180);
    ccanvas.drawImage(image, -image.width / 2, -image.height / 2);
}

function clearCanvas(context) {
    context.clearRect(0,0, parseInt(canvas_width), parseInt(canvas_height));
}
