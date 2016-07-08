$(document).ready(function(){
  var game = new Game;
});

var Game = function() {
  currentGame = this;
  currentGame.winner = "";
  currentGame.errorMessage = "";
  buildBoardArray();
  evaluateTurnUpdateStatus();
  clickHandler();
};

function buildBoardArray() {
  currentGame.board = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
  ];
};

function evaluateTurnUpdateStatus () {
  player = whoseTurn();
  if (currentGame.errorMessage != "") {
    updateStatusMessage(currentGame.errorMessage);
  } else {
    var statusMessage = "";
    player == "R" ? statusMessage = "Red, " : statusMessage = "Black, ";
    statusMessage += "it's your turn! Click a column to play your piece."
    updateStatusMessage(statusMessage);
  };
  updateMiniPiece(player);
}

function whoseTurn () {
  var flattenedBoard = [].concat.apply([], currentGame.board);
  var redCount = flattenedBoard.filter(function(piece) { return piece == "R" }).length;
  var blackCount = flattenedBoard.filter(function(piece) { return piece == "B" }).length;
  return redCount <= blackCount ? "R" : "B";
};

function updateStatusMessage(statusMessage) {
  $('.status_message').text(statusMessage);
};

function updateMiniPiece(player) {
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

function clickHandler () {
  $(".piece").on("click", function(event) {
      event.preventDefault();
      if (currentGame.winner == "") {
        var clickedPiece = $(this)[0];
        var clickedClass = $(clickedPiece).attr("class");
        var clickedColumn = clickedClass.charAt(clickedClass.indexOf("col") + 3);
        columnValues = getColumnValues(clickedColumn);
        var isValid = isValidColumn(columnValues);
        if (!isValid) {
          displayInvalidColumnMessage();
        } else {
          currentGame.errorMessage = "";
          placePiece(clickedColumn, columnValues);
          updateBoardArray(clickedColumn, columnValues);
        }
        evaluateWinner();
        if (currentGame.winner != "") {
          console.log("Winner is: " + currentGame.winner)
          updateStatusMessage("Congratulations, " + currentGame.winner + "! You Win!");
        } else {
          evaluateTurnUpdateStatus();
        }
      }
    });
}

function getColumnValues(column) {
  outputColumn = [];
  currentGame.board.forEach(function(row){outputColumn.push(row[column]);})
  return outputColumn;
};

function isValidColumn(columnValues) {
  var emptyPieces = columnValues.filter(function(piece) {return piece == ""});
  return emptyPieces.length > 0;
};

function displayInvalidColumnMessage() {
  if (currentGame.errorMessage == "") {
    player == 'R' ? currentGame.errorMessage += "Red, " : currentGame.errorMessage += "Black, ";
    currentGame.errorMessage += "the column's full! Try a different one :)";
    currentGame.updateStatusMessage(currentGame.errorMessage);
  }
};

function placePiece(clickedColumn, columnValues) {
  row = "row" + lowestOpenRow(columnValues);
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

function lowestOpenRow(columnValues) {
  for (var i = 0; i < columnValues.length; i++) {
    if (columnValues[i] != "") {return i-1;}
  }
  return i-1;
};

function updateBoardArray(clickedColumn, columnValues) {
  row = lowestOpenRow(columnValues);
  col = parseInt(clickedColumn);
  currentGame.board[row][col] = player;
}

function evaluateWinner() {
  evaluateWin(currentGame.board);                             // horizontal
  evaluateWin(transpose(currentGame.board));                  // vertical
  evaluateWin(diagonalize(currentGame.board));                // forward-slash diagonal
  evaluateWin(diagonalize(reverseBoard(currentGame.board)));  // back-slash diagonal
}

function evaluateWin(board) {
  board.forEach(function(row){
    rowString = row.join('.');
    // console.log(rowString);
    if (rowString.indexOf("R.R.R.R") != -1) {
      currentGame.winner = "Red";
    } else if (rowString.indexOf("B.B.B.B") != -1) {
      currentGame.winner = "Black";
    }
  })
}

function transpose(array) {
  return array[0].map(function (_, col) {
    return array.map(function (row) {
      return row[col];
    });
  });
}

function reverseBoard(board) {
  var reversedBoard = [];
  board.forEach(function(row){
    var newRow = row.slice();
    var reversedRow = newRow.reverse();
    reversedBoard.push(reversedRow);
  })
  return reversedBoard;
}

function diagonalize(board) {
  // var newBoard = [];
  // var numRows = board.length;    // 6
  // var numCols = board[0].length; // 7
  // var constraint = 4;
  // ultimately, the more scalable solution would do nested loops using vars above;
  // for now we'll manually build it:

  var row1 = [
    board[3][0],
    board[2][1],
    board[1][2],
    board[0][3]
  ]
  var row2 = [
    board[4][0],
    board[3][1],
    board[2][2],
    board[1][3],
    board[0][4]
  ]
  var row3 = [
    board[5][0],
    board[4][1],
    board[3][2],
    board[2][3],
    board[1][4],
    board[0][5]
  ]
  var row4 = [
    board[5][1],
    board[4][2],
    board[3][3],
    board[2][4],
    board[1][5],
    board[0][6]
  ]
  var row5 = [
    board[5][2],
    board[4][3],
    board[3][4],
    board[2][5],
    board[1][6]
  ]
  var row6 = [
    board[5][3],
    board[4][4],
    board[3][5],
    board[2][6]
  ]
  return [row1, row2, row3, row4, row5, row6]
}
