$(document).ready(function(){
  var game = new Game;
});

var Game = function() {
  this.buildBoard();
  // repeat loop until someone wins, starts here
    player = this.whoseTurn();
    console.log(player);
  // end repeat loop here
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
  return redCount > blackCount ? "B" : "R";
};




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

