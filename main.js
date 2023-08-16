const numBush=50;
const numBall=10;
const player=document.querySelector('.player');
const playerPos= {
x:parseInt(window.innerWidth/2),
y:parseInt(window.innerHeight/2)
};
const playerVelocity={
x:0,
y:0
}
var totalScore=0;
var scorebox=document.getElementById("scoreval");
// scorebox.innerHTML= "score :: "+ totalScore;
const balls=[];
const sound=new Audio('assets_coin.mp3');
function createBushes(){
    for(let i=0;i<numBush;i++){
    const div=document.createElement('div');
    div.classList.add('bush');
    div.style.left=Math.random()*100+'%';
    div.style.top=Math.random()*100+'%';
    document.body.appendChild(div);
    }
}
 function generateBall(){
    const div=document.createElement('div');
    div.classList.add('pokeball');
    let x=Math.random()*100+'%';
    let y=Math.random()*100+'%';
    div.style.left=x;
    div.style.top=y;
    balls.push({
        ball:div,
        pos:{
            x,
            y
        }
    })
    document.body.appendChild(div);
 }

function createPokeball(){
for(let i=0;i<numBall;i++){
   generateBall();
}
}
function Collisions($div1,$div2){
var x1=$div1.getBoundingClientRect().left;
var y1=$div1.getBoundingClientRect().top;
var h1=$div1.clientHeight;
var w1=$div1.clientWidth;
var b1=y1+h1;
var r1=x1+w1;
var x2=$div2.getBoundingClientRect().left;
var y2=$div2.getBoundingClientRect().top;
var h2=$div2.clientHeight;
var w2=$div2.clientWidth;
var b2=y2+h2;
var r2=x2+w2;
if(b1<y2||y1>b2||r1<x2||x1>r2) return false;
return true;

}
function checkCollisions(){
balls.forEach(ball=>{
    if(Collisions(ball.ball,player)){
        sound.play();
        /////
        totalScore+=5;
        scorebox.innerHTML= "score :: "+ totalScore;
        ball.ball.remove();
        generateBall();
    }
})

}
function run(){
    playerPos.x+=playerVelocity.x;
    playerPos.y+=playerVelocity.y;

    player.style.left=playerPos.x + 'px';
    player.style.top=playerPos.y + 'px';
    checkCollisions();
    requestAnimationFrame(run);
}
function init(){
    createBushes();
createPokeball();
run();
}
init();
window.addEventListener('keydown',function(e){
    if(e.key=="ArrowUp"){
        playerVelocity.y=-5;
        player.style.backgroundImage='url("player_front.png")';
    }
    if(e.key=="ArrowDown"){
        playerVelocity.y=+5;
        player.style.backgroundImage='url("player_back.png")';
    }
    if(e.key=="ArrowRight"){
        playerVelocity.x=5;
        player.style.backgroundImage='url("player_right.png")';
    }
    if(e.key=="ArrowLeft"){
        playerVelocity.x=-5;
        player.style.backgroundImage='url("player_left.png")';
    }
    player.classList.add('active');
})
window.addEventListener('keyup',function(){
    playerVelocity.x=0
    playerVelocity.y=0
    player.classList.remove('active');
})
