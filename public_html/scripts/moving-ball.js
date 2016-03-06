/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var boxwidth = 350;
var boxheight = 250;
var boxX = 20;
var boxY = 30;

var ballImage = new Image();
ballImage.src="images/ball.jpeg";

var ballX = 50;
var ballY = 60;
var ballVelocityX = 4;
var ballVelocityY = 8;
var ballRadius = 10;

var boxBoundX = boxwidth+boxX - ballRadius;
var boxBoundY = boxheight + boxY - ballRadius;
var inboxBoundX = boxX + ballRadius;
var inboxBoundY = boxY + ballRadius;

var gradientColors = [
    
    [255,0,0],
    [255,255,0],
    [0,255,0],
    [0,255,255],
    [0,0,255],
    [255,0,255]
];

var canvas;
function init(){
    canvas = document.getElementById('canvas').getContext('2d');
    var grad = canvas.createLinearGradient(boxX, boxY, boxX+boxwidth, boxY+boxheight);
    for ( var g = 0; g<gradientColors.length; g++){
        var color ='rgb('
        +gradientColors[g][0]+','
        +gradientColors[g][1]+','
        +gradientColors[g][2]
        +')';
        grad.addColorStop(g / 6, color);
    }
    canvas.fillStyle = grad;
    canvas.lineWidth = 10;
    drawBox();
    setInterval(drawBox, 100);
}

function drawBox(){
    canvas.clearRect(boxX,boxY,boxwidth,boxheight);
    animateBall();
    canvas.drawImage(ballImage, ballX-10,ballY-10,2*ballRadius, 2*ballRadius);
    canvas.fillRect(boxX,boxY,10,boxheight);
    canvas.fillRect(boxX+boxwidth - 10, boxY, 10, boxheight);
    canvas.fillRect(boxX, boxY, boxwidth, 10);
    canvas.fillRect(boxX, boxY+boxheight, boxwidth, 10);
}

function animateBall() {
    var newPositionX = ballX + ballVelocityX;
    var newPositionY = ballY + ballVelocityY;
    if(newPositionX>boxBoundX){
        ballVelocityX=-ballVelocityX;
        newPositionX=boxBoundX;
    }
    if(newPositionX<inboxBoundX){
        newPositionX=inboxBoundX;
        ballVelocityX=-ballVelocityX;
    }
    if(newPositionY>boxBoundY){
        newPositionY = boxBoundY;
        ballVelocityY=-ballVelocityY;
    }
    if(newPositionY<inboxBoundY){
        ballVelocityY=-ballVelocityY;
        newPositionY=inboxBoundY;
    }
    ballX=newPositionX;
    ballY=newPositionY;
    
}

function changeVelocity() {
    ballVelocityX = Number(controlPanel.hv.value);
    ballVelocityY = Number(controlPanel.vv.value);
    return false;
}
