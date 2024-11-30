let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];
let started= false;
let level=0;
let highScore =4;
let yourScore=0;
let high = document.querySelector(".highscore");
let userscore = document.querySelector(".yourscore");
let h4= document.querySelector("h4");
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
    btn.classList.remove("flash");
    }, 250);   //1000 means 1 second and 250 is one-fourth part of 1 second
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
    btn.classList.remove("userflash");
    }, 250);   //1000 means 1 second and 250 is one-fourth part of 1 second
}
function levelUp(){
    userSeq=[];
 level++;
 h2.innerText=`Level ${level}`;


 //random button choose
 let randIdx = Math.floor(Math.random()*3);
 let randColor = btns[randIdx];
 let randBtn = document.querySelector(`.${randColor}`);
 console.log("Index from four buttons of y,r,p,g : ",randIdx);
 console.log("Color generated from this seq : ",randColor);
 console.log("Button of this color is : ",randBtn);
 gameSeq.push(randColor);
 console.log("Game sequence made : ",gameSeq);

 btnflash(randBtn);
}
function checkAns(idx){
    console.log("current level : ", level);
 
  if(userSeq[idx] === gameSeq[idx]){
    if(userSeq.length === gameSeq.length){
        yourScore=level;
       setTimeout(levelUp,1000);
       
        
        userscore.innerText=`Your Score : ${yourScore}`;
        if(yourScore>highScore){
            highScore=yourScore;
            high.innerText=`High Score : ${highScore}`;
        }
       
    }
  }
  else{
    //game over
    if(yourScore>=highScore){
        h2.innerHTML=`Game Over! You have a high score of <b>${highScore}</b> <br> Press any key to start again.`;
        
       
    }
    else{
    h2.innerHTML=`Game Over! Your score is <b>${yourScore}</b> <br> Press any key to start again.`;
    
    }
    userscore.innerText=`Your Score : 0`;
    let body = document.querySelector("body");
    docflash(body);

    //resetting the value of started to false 
    //calling function
    reset();
  }
    
}
function docflash(body){
    body.classList.add("docflash");
    setTimeout(() => {
    body.classList.remove("docflash");
    }, 300);   //1000 means 1 second and 250 is one-fourth part of 1 second
}


function btnPress(){
    let btn=this ;
    userflash(btn);
    userColor= btn.getAttribute("id");
    console.log("Id of button pressed by user : ",userColor);

    userSeq.push(userColor);
    console.log("User sequence made : ",userSeq);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq=[];
    userSeq =[];
    level=0;
    yourScore = 0; // Reset yourScore
    userscore.innerText = `Your Score: ${yourScore}`; // Reset displayed user score
}