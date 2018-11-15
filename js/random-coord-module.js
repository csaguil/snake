var RandomCoordModule = (function(width, height, unit) {
  function randInt(ceiling) {
    return Math.floor(Math.random() * ceiling);
  }

  return {
    randX: function() {
      return randInt((width / unit) - 2) + 1;
    },
    randY: function() {
      return randInt((height / unit) - 2) + 1;
    }
  }
});
