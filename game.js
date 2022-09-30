
var userClickedPattern = [];
var  gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var soundcolor;
var randomChosenColour;
var randomNumber;
var level = 0;
var started = false;

//  PRESS A KEY TO START 
$('body').keypress(function(){
    if(!started){
$('h1').text("Level " + level);
nextSequence();
// $('body').unbind('keypress');
started = true;
}
})

// started = !started;

// USER CLICKS TURNS ON AFTER GAME STARTS _ NESTED WITHIN PRESS A KEY TO START
// if(started === true){
    $('.btn').click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        // setTimeout(() => {
        //     nextSequence();
        // }, 1000);
        console.log(userClickedPattern);
        checkAnswer(userClickedPattern.length-1);
    });
    // }
// });

// NEXT COLOR 

function nextSequence(){
userClickedPattern = [];

    $('#level-title').text("Level "+ level);
    randomNumber = Math.round(Math.random() * 3);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour);
    // // for( let x = 0; x<gamePattern.length; x++){
    // $('#level-title').text("Level "+ level);
    // // }
    level++;
    console.log(randomChosenColour);
}

function checkAnswer(currentLevel){
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
console.log("success");
if (userClickedPattern.length === gamePattern.length){
    setTimeout(() => {
            nextSequence();
        }, 1000);
}} 
else{ console.log("wrong");
playSound("wrong");
    $("body").addClass("game-over");
setTimeout(() => {
    $("body").removeClass("game-over");
}, 200);
$("h1").text("Game Over, Press Any Key to Restart");
gameOver();
}
}

function gameOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

// SOUNDS

function playSound(name){
soundcolor = new Audio("sounds/" + name + ".mp3");
soundcolor.play();
}

// ANIMATION

function animatePress(currentColour){
    setTimeout(() => {
    $("#" + currentColour).addClass("pressed");    
    }, .01);
    setTimeout(() => {
    $('#' + currentColour).removeClass("pressed");
    }, 200);
}