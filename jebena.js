let board;
let boardWidth=600;
let boardHeight=600;
let context;

let jebenaWidth=100;
let jebenaHeight=100;
let jebenaX=50;
let jebenaY=boardHeight-jebenaHeight;
let jebenaImg;

let jebena={
    x:jebenaX,
    y:jebenaY,
    width:jebenaWidth,
    height:jebenaHeight
}
let ciniArray=[];

let cini1Width=43;
let cini2Width=79;
let cini3Width=112;

let ciniHeight=70;
let ciniX=700;
let ciniY=boardHeight-ciniHeight;

let cini1Img;
let cini2Img;
let cini3Img;

let velocityX=-8;
let velocityY=0;
let gravity=.4;
let gameOver=false;
let score=0;

window.onload =function() {
board =document.getElementById("board");
board.height=boardHeight;
board.width=boardWidth;
context= board.getContext("2d");
jebenaImg=new Image();
jebenaImg.src="./img/jebena.png";
jebenaImg.onload=function(){
context.drawImage(jebenaImg,jebena.x,jebena.y,jebena.width,jebena.height);
}
cini1Img=new Image();
cini1Img.src="./img/cini.png";

cini2Img=new Image();
cini2Img.src="./img/etan.png";

cini3Img=new Image();
cini3Img.src="./img/rekebot.png";

requestAnimationFrame(update);
setInterval(placeCini,1000);
document.addEventListener("keydown", moveJebena);
document.addEventListener("keyup", function(e) {
    if (e.code === "Space" && gameOver) {
        location.reload();
    }
});
}
function update(){
    requestAnimationFrame(update);
    if(gameOver){
        context.fillText("Game Over", boardWidth / 2, boardHeight / 9);
        return;
    }
   
    context.clearRect(0,0,board.width,board.height);
    velocityY +=gravity;
    jebena.y=Math.min(jebena.y+velocityY,jebenaY);
    context.drawImage(jebenaImg,jebena.x,jebena.y,jebena.width,jebena.height);
  
    
    for(let i=0; i< ciniArray.length;i++){
        let cini=ciniArray[i];
        cini.x +=velocityX; 
    context.drawImage(cini.img,cini.x,cini.y,cini.width,cini.height);
    context.fillStyle="black";
    context.textAlign = "center";
        context.font="20px courier " 
       
        score++;
        context.fillText(score,10,20);
    if (detectCollision(jebena,cini)){
        gameOver=true; 
        jebenaImg.src="./img/tesebere.png";
        jebenaImg.onload=function(){
            context.drawImage(jebenaImg,jebena.x,jebena.y,jebena.width,jebena.height);
        }
        
    }
}


}
function moveJebena(e){
    if(gameOver){
        return;
    }
    if ((e.code == "Space" || e.code == "ArrowUp") && jebena.y==jebenaY){
        velocityY=-10;
    }

}
function placeCini(){
    if(gameOver){
        return;
    }
    
let cini={
    img:null,
    x:ciniX,
    y:ciniY,
    width:null,
    height:ciniHeight

}
let placeCiniChance= Math.random();
if(placeCiniChance>.90){
    cini.img=cini3Img;
    cini.width=cini3Width;
    ciniArray.push(cini);
}
else if(placeCiniChance>.70){
    cini.img=cini2Img;
    cini.width=cini2Width;
    ciniArray.push(cini);
}
else if (placeCiniChance>.50){
    cini.img=cini1Img;
    cini.width=cini1Width;
    ciniArray.push(cini);
}
if (ciniArray.length>5){
    ciniArray.shift();
}

}
function detectCollision(a,b){
    return a.x<b.x +b.width &&
          a.x+a.width>b.x &&
          a.y <b.y+b.height &&
          a.y +a.height >b.y;
}