$(document).ready(function(){
  var game = new Game;
});

var Game = function() {
  this.buildBoard();
  currentGame = this;
  currentGame.winner = "";
  currentGame.errorMessage = "";
  // debugger;
  evaluateTurnUpdateStatus();
  clickHandler();
};

function evaluateTurnUpdateStatus () {
  player = currentGame.whoseTurn();
  // debugger;
  if (currentGame.errorMessage != "") {
    currentGame.updateStatusMessage(currentGame.errorMessage);
  } else {
    var statusMessage = "";
    player == "R" ? statusMessage = "Red, " : statusMessage = "Black, ";
    statusMessage += "it's your turn! Click a column to play your piece."
    currentGame.updateStatusMessage(statusMessage);
  };
  currentGame.updateMiniPiece(player);
}

function clickHandler () {
  $(".piece").on("click", function(event) {
      event.preventDefault();
      clickedPiece = $(this)[0];
      clickedClass = $(clickedPiece).attr("class");
      clickedColumn = clickedClass.charAt(clickedClass.indexOf("col") + 3);
      columnValues = currentGame.getColumnValues(clickedColumn);
      var isValid = currentGame.isValidColumn();
      if (!isValid) {
        displayInvalidColumnMessage();
      } else {
        currentGame.errorMessage = "";
        currentGame.placePiece();
        currentGame.updateBoardArray();
      }
      evaluateTurnUpdateStatus();
      evaluateWinner();
  });
}

function evaluateWinner() {

}




Game.prototype.updateBoardArray = function() {
  row = currentGame.lowestOpenRow();
  col = parseInt(clickedColumn);

  // console.log("Board before updating: ");
  // console.log(currentGame.board);
  // console.log("Row is: " + row + ", Col is: " + col + ", Player is: " + player);

  currentGame.board[row][col] = player;
}

Game.prototype.placePiece = function() {
  row = "row" + currentGame.lowestOpenRow();
  col = "col" + clickedColumn;
  cssSelector = "." + row + "." + col;
  if (player == "R") {
    $(cssSelector).removeClass("white");
    $(cssSelector).addClass("red");
  } else {
    $(cssSelector).removeClass("white");
    $(cssSelector).addClass("black");
  };
};

Game.prototype.lowestOpenRow = function() {
  for (var i = 0; i < columnValues.length; i++) {
    if (columnValues[i] != "") {return i-1;}
  }
  return i-1;
};

function displayInvalidColumnMessage () {
  if (currentGame.errorMessage == "") {
    player == 'R' ? currentGame.errorMessage += "Red, " : currentGame.errorMessage += "Black, ";
    currentGame.errorMessage += "the column's full! Try a different one :)";
    // debugger;
    currentGame.updateStatusMessage(currentGame.errorMessage);
  }
};

Game.prototype.isValidColumn = function() {
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
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
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

