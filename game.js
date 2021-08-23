//it will store the chosencolor at the end to remeber the complete pattern
var gamePattern = [];
var userClickedPattern = [];
//all the colors present
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

//any key pressed to start the game [call nextSequence]
$(document).on("keypress", function (){
  if(!started)
  {
    // starting from level 0
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//clicking the button and storing the id of the triggered button in userChosenColor
$(".btn").on("click", handler);

function handler()
{
  var userChosenColor = $(this).attr("id");
  //storing the content of userChosenColor at the end of userClickedPattern
  userClickedPattern.push(userChosenColor);
  //playing sound on click
  playSound(userChosenColor);
  //animation
  animatePress(userChosenColor);
  //checking the answer
  checkAnswer(userClickedPattern.length-1);
}


function playSound(name)
{
  //playing the sound
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor)
{
  //adding effect
  $("#" + currentColor).addClass("pressed");
  //to have a delay of 100 milliseconds and then remove the effect
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel)
{
  //the pattern generated should be equal to the user's pattern
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
  {
    console.log("Success");
    //if the pattern is right check if the sequence is finished
    if(gamePattern.length == userClickedPattern.length)
    {
      //calling nextSequence after 1000 miliseconds
      setTimeout( function(){
        nextSequence()
      }, 1000);
    }
  }
  else
  {
    //wrong pattern animate effect
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);
    //playing wrong pattern sound
    playSound("wrong");
    //changing the h1 to "Game Over"
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //restarting the game
    startOver();
  }
}


//this will generate a random number and choose the color accordingly
function nextSequence()
{
  userClickedPattern = [];
  //increasing the level and updating it
  level++;
  $("#level-title").text("Level " + level);
  //generating random number between 0 and 3 (including the limits)
  var randomNumber = Math.floor(Math.random()*4);

  //random color is chosen
  var randomChosenColor = buttonColors[randomNumber];

  //adding that random color to the pattern
  gamePattern.push(randomChosenColor);

  //to give the selectedButton a flash effect
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}


//restart the game
function startOver()
{
  level = 0;
  started = false;
  gamePattern = [];
}
