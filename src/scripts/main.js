// constant definitions
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const PAINT_CODE = document.getElementById('paintcode');
const SUBMIT_BUTTON = document.getElementById('submitbutton');

// listeners
SUBMIT_BUTTON.addEventListener("click", main);


// function definitions
function main() {
    let input_code = PAINT_CODE.value;
    alert(input_code);
}

let img = new Image();
img.onload = function() {
    drawImage(img, 100,100, 0.05, 0);
    drawImage(img, 140,100, 0.05, 0);
    drawImage(img, 180,100, 0.05, 0);
    drawImage(img, 220,100, 0.05, 0);
    drawImage(img, 260,100, 0.05, 0);
    drawImage(img, 300,100, 0.05, 0);
    drawImage(img, 340,100, 0.05, 0);
    drawImage(img, 0,0,0.05,0)
}
img.src = "./images/heart.svg";



ctx.translate(100,100);
ctx.rotate(Math.PI/4);
ctx.translate(0,0);

let img2 = new Image();
img2.onload = function() {
    // drawImage(img2, 100,100,0.1, 380);
}
img2.src = "./images/1F919-1F3FB.svg";

ctx.setTransform(1,0,0,1,0,0);

function drawImage(image, x, y, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(rotation*Math.PI/180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
}
