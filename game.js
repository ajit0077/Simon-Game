var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
})

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
      new Audio("sounds/wrong.mp3").play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass('game-over');

      }, 200);
   $("#level-title").text("Game Over, Press Any Key to Restart");
 startOver();
  }

}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');

  }, 100);
}
function startOver(){
  level=0;
  gamePattern=[];
  started = false;
}
