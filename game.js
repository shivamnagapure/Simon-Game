var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [] ;

var level = 0 ;

var started = false ;

$(document).keydown(function(){
    if(!started){ 
        nextSequence();
        // $("#level-title").text("Level " + level);
        started = true;
        
    }
})


function nextSequence(){
    
    userClickedPattern = [];
    level++ ;
    $("#level-title").text("Level " + level); 
    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor);
    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    
};

$(".btn").click(function() {
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
  });
  
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColour){
    var self =  $("."+currentColour)
    self.addClass("pressed");
    setTimeout(function(){
        self.removeClass("pressed");
    } , 100);
};

function checkAnswer(currentlevel){
    console.log(currentlevel);
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        console.log("success");
        
        if(gamePattern.length  === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    } else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
  
};

function startOver(){
    gamePattern = [];
    level = 0 ;
    started = false ;
}
