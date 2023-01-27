//board
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakex = blocksize * 5;
var snakey = blocksize * 5;
//food
var foodx ;
var foody ;
//give snake some speed
var velocityx=0;
var velocityy=0;

//body of snake
var snakebody = [];
var grd;
var score=0;
//end game 
var gameover = false;
window.onload = function() {
    board =  document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");//for drawing on board
    grd= context.createLinearGradient(255, 248, 0, 100);
    grd.addColorStop(0, "#241200");
    grd.addColorStop(1, "yellow");
    //call random food place genreating function
    placefood();
    document.addEventListener("keyup", changedirection);
    //since we ahve to update it multiple times
    setInterval(update, 1000/10);
    
}

function update() {
    //chcek if game is over or not
    if(gameover){
        return;
    }
    context.fillStyle = "#797D7F";
    context.fillRect(0 , 0, board.width, board.height);
    context.fillStyle = "deeppink";
    context.fillRect(foodx, foody, blocksize, blocksize);
    //conditio to ceheckif the snake has eaten the food
    if(snakex == foodx && snakey == foody){
        //update heigth of snake
        snakebody.push(foodx, foody);
        placefood();//change the food location
    }

    for (let i=snakebody.length-1; i>0 ; i--){
        snakebody[i]=snakebody[i-1];
    }
    if(snakebody.length){
        snakebody[0] = [snakex, snakey];
    }
    //context.fillStyle="cyan";
    //context.fillStyle= "x";
    context.fillStyle = grd;

    snakex+=velocityx*blocksize;
    snakey+=velocityy*blocksize;
    context.fillRect(snakex, snakey, blocksize, blocksize);
    //draw full snake
    for (let i = 0; i<snakebody.length; i++){
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
    }
    score = snakebody.length;
    //checks for game over
    //if you are out of box
    if(snakex < 0 || snakex > cols*blocksize ||snakey < 0 || snakey > rows*blocksize){
        gameover=true;
        alert("Game Over!!!!!!! Re-load to try again");
    }
    //if you eat yourself
    for(let i=0; i < snakebody.length; i++){
        if(snakex == snakebody[i][0] && snakey == snakebody[i][1]){
            gameover = true;
            alert("Game Over!!!!!!! Re-load to try again");
        }
    }
}
//function to palce food at random places
function placefood() {
    foodx = Math.floor(Math.random()*cols)*blocksize;
    foody = Math.floor(Math.random()*rows)*blocksize;
}

//function for movement  of snake
function changedirection(e) {
    //move the direction of snake
    //check for not moving in 180 direction
    if(e.code == "ArrowUp" && velocityy!=1){
        velocityx=0;
        velocityy=-1;
    }
    else if(e.code == "ArrowDown" && velocityy!=-1 ){
        velocityx=0;
        velocityy=1;
    }
    else if(e.code == "ArrowRight" && velocityx!=-1){
        velocityx=1;
        velocityy=0;
    }
    else if(e.code == "ArrowLeft" && velocityx!=1){
        velocityx=-1;
        velocityy=-0;
    }
    
}