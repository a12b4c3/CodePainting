import dynamicCanvas from '../libs/DynamicCanvas.js';
import Tokenizer from "../libs/tokenizer.js";
import PROGRAM from "../ast/PROGRAM.js";

// constant definitions
const mainCanvas = document.getElementById('canvas');
export const canvas_width = parseInt(mainCanvas.getAttribute('width'));
export const canvas_height = parseInt(mainCanvas.getAttribute('height'));
const mainContext = mainCanvas.getContext('2d');
const PAINT_CODE = document.getElementById('paintcode');
const SUBMIT_BUTTON = document.getElementById('submitbutton');
const dCanvas = dynamicCanvas;
const dContext = dynamicCanvas.getDContext();

// listeners
SUBMIT_BUTTON.addEventListener("click", main);

// list of literals
const baseLiterals = ["art", "img", "text", "\\(", "\\)", "\\.", "=", " ", "background"];
const artParamLiterals = [];
const textParamLiterals = [];
const imgParamLiterals = [];

// TODO remove this after testing is done
// document.getElementById('paintcode').innerText = "art(shapename=hello x=10 y=10 w=100 h=100)\n img(name='star' scale=1).repeathorizontally(spacing=10 repeat=10)\n text(comment='hello how are you')";
document.getElementById('paintcode').innerText = "img(name=star x=200 y=90 scale=1 rotation=30).repeatvertically(spacing=50 repeat=5)";
// "text(comment=enjoyYourLife font=Georgia fontsize=25 fontcolor=brown rotation=10).repeatvertically(spacing=50 repeat=6)"

// function definitions
function main() {
    mainContext.clearRect(0,0,canvas_width,canvas_height);
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
        mainContext.stroke();
        mainContext.fill();
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


// mainContext.translate(100,100);
// mainContext.rotate(Math.PI/4);
// mainContext.translate(0,0);
//
// mainContext.setTransform(1,0,0,1,0,0);


function drawImageToCanvas(image, x, y, scale, rotation, ccanvas) {
    ccanvas.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ccanvas.rotate(rotation*Math.PI/180);
    ccanvas.drawImage(image, -image.width / 2, -image.height / 2);
}

function clearCanvas(context) {
    context.clearRect(0,0, parseInt(canvas_width), parseInt(canvas_height));
}
