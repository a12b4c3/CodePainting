const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
img.onload = function() {
    ctx.drawImage(img, 20,20, 200, 200);
}
img.src = "./images/heart.svg";



ctx.translate(100,100);
ctx.rotate(Math.PI/4);
ctx.translate(0,0);

let img2 = new Image();
img2.onload = function() {
    drawImage(img2, 100,100,0.1, 380);
}
img2.src = "./images/1F919-1F3FB.svg";

ctx.setTransform(1,0,0,1,0,0);

function drawImage(image, x, y, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(rotation*Math.PI/180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
}

canvas.style.background = "purple";