//helper module for maintaining boolean matrix representation of game grid
var GridModule = (function(width, height, unit) {
  var grid = buildGrid();

  //inits grid with all false values
  function buildGrid() {
    var grid = [];
    for (var row = 0; row < height / unit; row++) {
      grid.push([]);
      for (var col = 0; col < width / unit; col++) {
        grid[row].push(false);
      }
    }
    return grid;
  }

  function isValidCoord(col, row) {
    return (row >= 0) && (row < height / unit) && (col >= 0) && (col < width / unit);
  }

  return {
    setFull: function(col, row) {
      if (isValidCoord(col, row)) {
        grid[row][col] = true;
      }
    },
    setEmpty: function(col, row) {
      if (isValidCoord(col, row)) {
        grid[row][col] = false;
      }
    },
    isFull: function(col, row) {
      if (isValidCoord(col, row)) {
        return grid[row][col];
      }
    }
  }

});
