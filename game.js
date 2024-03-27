var colorButton=["green","red","yellow","blue"];
var computerPattern=[];
var usersPattern=[];

var level=0;
var start=false;
 
document.addEventListener("keydown",function(){
    if(!start){
        start=true;
        document.querySelector("h1").textContent="Level "+level;
        sequence();
    }
});

function sequence(){
    usersPattern=[];
    level++;
    document.querySelector("h1").textContent="Level "+level;
    var randomNum=Math.floor(Math.random()*4);
    var randomColour=colorButton[randomNum];
    computerPattern.push(randomColour);
    
    soundProduce(randomColour);
    animateByComp(randomColour);

}

for(var i=0; i<document.querySelectorAll(".btn").length; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click",checkBtnPressUser);
}

function checkBtnPressUser(){
    var cruntObject=this;
    var colourByUser=cruntObject.getAttribute("id");
    usersPattern.push(colourByUser);
    
    soundProduce(colourByUser)
    
    cruntObject.classList.add("pressed");
    setTimeout(function(){
        cruntObject.classList.remove("pressed");
    },100);

    checkAnswer(usersPattern.length-1);
}

function checkAnswer(curntUserArrayLength){
    if(usersPattern[curntUserArrayLength]===computerPattern[curntUserArrayLength]){
        if(usersPattern.length===computerPattern.length){
            setTimeout(function(){
                sequence();
            },1000)
        }
    }else{
        document.querySelector("h1").textContent="Game Over, Press Any Key to Restart";

        document.querySelector("body").classList.add("game-over");
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
        },200);
        soundProduce("wrong");
        level=0;
        start=false;
        computerPattern=[];
    }
}

function soundProduce(colour){
    var audio=new Audio("./sounds/"+colour+".mp3");
    audio.play();
}

function animateByComp(color){
    document.querySelector("."+color).classList.add("animaTion");
    setTimeout(function() {
        document.querySelector("."+color).classList.remove("animaTion");
    }, 100);
}
