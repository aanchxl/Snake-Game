
const playboard= document.querySelector(".play-board");
const scoreelement= document.querySelector(".score");
const highscoreelement= document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls i");
let gameover=false;
let foodx=Math.floor(Math.random() * 30) +1;
let foody=Math.floor(Math.random() * 30) +1;
let snakex=10, snakey=12;
let velocityx=0, velocityy=0;
let snakebody = [];
let score=0;

//getting high score from local storage 
let highscore= localStorage.getItem("high-score") || 0; //otherwise it shows null
highscoreelement.innerText=`High Score: ${highscore}`;

snakebody[0]=[snakex, snakey];
let setintervalid;
const changefoodposition = () => {
    foodx= Math.floor(Math.random() * 30) +1;
    foody= Math.floor(Math.random() * 30) +1;
}
const handlegameover=() => {
    //reloading and clearing timer 
    alert("Game Over! Press OK to replay...");
    clearInterval(setintervalid);
    location.reload();
}
const changedirection = (e) => {
    if (e.key==='ArrowUp' && velocityy!=1) {
        velocityx=0;
        velocityy=-1;
    }
    else if (e.key==='ArrowDown' && velocityy!=-1) {
        velocityx=0;
        velocityy=1;
    }
    else if (e.key==='ArrowRight'&& velocityx!=-1) {
        velocityx=1;
        velocityy=0;
    }
    else if (e.key==='ArrowLeft'&& velocityx!=1) {
        velocityx=-1;
        velocityy=0;
    }
    initgame()
}

controls.forEach(key => {
    key.addEventListener("click", () => changedirection({key : key.dataset.key}));
})
const initgame=() => {
    if (gameover) handlegameover();
    let htmlmarkup= `<div class="food" style="grid-area: ${foody} / ${foodx}"> </div>`;
    if (snakex==foodx && snakey==foody) {
        snakebody.push([foodx,foody]);
        console.log(snakebody);
        changefoodposition();
        score++;
        if (score >= highscore) {
            highscore = score;
          }
        localStorage.setItem("high-score", highscore);
        scoreelement.innerText= `Score: ${score}`;
        highscoreelement.innerText= `High Score: ${highscore}`;
    }
    for (let i=snakebody.length-1; i>0;i--) {
        snakebody[i]=snakebody[i-1];
    }
    snakebody[0]=[snakex, snakey];

    // updating snakehead pos
    snakex+=velocityx;
    snakey+=velocityy;

    if (snakex<=0 || snakex>30 || snakey<=0 || snakey>30) {
        console.log("Game Over!");
        gameover=true;
    }

    //adding div food each snake body part
    for (let i=0; i<snakebody.length; i++) {
        htmlmarkup+=`<div class="shead" style="grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"> </div>`;
    
        // if snake hits body
        if (i!==0 && snakebody[0][1]===snakebody[i][1] && snakebody[0][0]===snakebody[i][0]) {
            gameover=true;
        }    
    }
    
    
    playboard.innerHTML=htmlmarkup;
}
setintervalid=setInterval(initgame, 125);
changefoodposition();
document.addEventListener("keydown", changedirection);