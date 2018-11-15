/**
** module to help get and set high scores from browser cookies
**/
var ScoreModule = (function() {
  // retrieves score and displays it on screen
  function setupScore(points) {
    document.getElementById("score").innerHTML = "Score: " + points;
    var highscore = document.cookie;
    if (highscore.length == 0) {
      document.getElementById("highscore").innerHTML = "High Score: 0";
    } else {
      console.log(extractHighscore(highscore));
      document.getElementById("highscore").innerHTML = "High Score: " + extractHighscore(highscore);
    }
  }

  // determines if a new high score has been made and sets it
  function setNewHighscore(points) {
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = d.toUTCString();
    var highscore = document.cookie;
    if (highscore.length == 0) {
      document.cookie = "highscore="+ points + "; expires=" + expires + ";path=/";
    } else {
      var oldHighscore = extractHighscore(highscore);
      if (points > oldHighscore) {
        document.cookie = "highscore="+ points + "; expires=" + expires + ";path=/";
      }
    }
  }

  // extracts the number value of the high score from the cookie string
  function extractHighscore(highscore) {
    var highscoreString = highscore.split(";")[0];
    return (highscoreString.split("=")[1]);
  }

  return {
    setupScore: function(points) {
      setupScore(points);
    },
    setNewHighscore: function(points) {
      setNewHighscore(points);
    },
  }
});
