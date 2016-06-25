$(document).ready(function(){
  var game = new Game;
});

var Game = function() {
  // var winner = "";
  this.buildBoard();
  // repeat loop until someone wins, starts here
    currentGame = this;
    player = this.whoseTurn();
    var statusMessage = "";
    player == "R" ? statusMessage = "Red, " : statusMessage = "Black, ";
    statusMessage += "it's your turn! Click a column to play your piece."
    this.updateStatusMessage(statusMessage);
    this.updateMiniPiece(player);
    $(".piece").on("click", function(event) {
        event.preventDefault();
        clickedPiece = $(this)[0];
        clickedClass = $(clickedPiece).attr("class");
        clickedColumn = clickedClass.charAt(clickedClass.indexOf("col") + 3);
        var isValid = currentGame.isValidColumn(clickedColumn);

        if (!isValid) {
          currentGame.displayInvalidColumnMessage();
        } else {
          currentGame.updateStatusMessage("Clicked column = " + clickedColumn);
          // it's a valid column, place their piece!
          // currentGame.placePiece()
        }

    });

  // end repeat loop here
};

// Game.prototype.placePiece

Game.prototype.displayInvalidColumnMessage = function() {
  var statusMessage = ""
  player == 'R' ? statusMessage += "Red, " : statusMessage += "Black, ";
  statusMessage += "that's not a valid column! Please try again."
  currentGame.updateStatusMessage(statusMessage);
};

Game.prototype.isValidColumn = function(column) {
  var columnValues = currentGame.getColumnValues(clickedColumn);
  var emptyPieces = columnValues.filter(function(piece) {return piece == ""});
  return emptyPieces.length > 0;
};

Game.prototype.getColumnValues = function(column) {
  outputColumn = [];
  currentGame.board.forEach(function(row){outputColumn.push(row[column]);})
  return outputColumn;
};

Game.prototype.buildBoard = function() {
  this.board = [
    ["", "", "R", "", "", "", ""],
    ["", "", "R", "", "", "", ""],
    ["", "", "R", "", "", "", ""],
    ["", "", "R", "", "", "", ""],
    ["", "", "R", "", "", "", ""],
    ["", "", "R", "", "", "", ""]
  ];
};

Game.prototype.whoseTurn = function() {
  var flattenedBoard = [].concat.apply([], this.board);
  var redCount = flattenedBoard.filter(function(piece) { return piece == "R" }).length;
  var blackCount = flattenedBoard.filter(function(piece) { return piece == "B" }).length;
  return redCount <= blackCount ? "R" : "B";
};

Game.prototype.updateStatusMessage = function(statusMessage) {
  $('.status_message').text(statusMessage);
};

Game.prototype.updateMiniPiece = function(player) {
  if (player == "R") {
    $(".mini_piece").removeClass("white");
    $(".mini_piece").removeClass("black");
    $(".mini_piece").addClass("red")
  } else {
    $(".mini_piece").removeClass("white");
    $(".mini_piece").removeClass("red");
    $(".mini_piece").addClass("black")
  }
}





//  JQuery - play button event listener here (or somewhere)



// Game.prototype.playGame = function() {

//   var currentColor = this.whoseTurn();
//   var boardRow = 3;

//   for (i=0; i<10; i++) {
//     var chosenColumn = prompt("Which column do you want?\nPick a number from 1 to 4");
//     var placed = false;
//       while (placed === false) {
//       };
//       var slot = this.currentGame[boardRow][chosenColumn - 1];

//       if (slot === "") {
//         this.currentGame[boardRow][chosenColumn - 1] = currentColor;
//         console.log(this.currentGame[boardRow][chosenColumn - 1]);

//         console.log(this.currentGame);
//         placed = true;
//       } else {

//         if (boardRow == 0) {
//           alert("This column is full");
//           console.log(this.currentGame);
//           placed = true;
//         } else {
//           boardRow -= 1;
//         };

//       };

//   };

// };

// Game.prototype.redWins = "R" * 4;
// Game.prototype.blackWins = "B" * 4;

// Game.prototype.horizontalWin = function(){

//   for(i = 0; i < this.currentGame.length; i++){
//     if (this.currentGame[i].join() === this.redWins) {
//       return "Red Wins"
//     } else if (this.currentGame[i].join() === this.blackWins) {
//       return "Black Wins"
//     }
//   }
// };

// Game.prototype.verticalWin = function(){

//   var transpose = function(a)  {
//     return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
//   }
//   transpose(this.currentGame);
//   for(i = 0; i < this.currentGame.length; i++){
//     if (this.currentGame[i].join() === this.redWins) {
//       return "Red Wins"
//     } else if (this.currentGame[i].join() === this.blackWins) {
//       return "Black Wins"
//     }
//   }
// };

// Game.prototype.diagonalWin = function(){

// };

