"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const DISPLAY_CURRENT_PLAYER = document.querySelector("#current-player");
const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    // push inner array into board
    let row = [];
    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }
    board.push(row);
  }
  // return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board");

  // create the top table row and attach a click event listener that calls
  // handleClick() and assign id "column-top"
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // Create each of the cells in the top row, assign each one an id 'top-#'
  // and append them to the top table row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    const row = document.createElement("tr");
    row.setAttribute("id", `row-${y}`);

    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      const cell = document.createElement("td");
      cell.setAttribute("id", `c-${y}-${x}`);
      cell.setAttribute("class", "cell");
      // TODO: add an id, c-y-x, to the above table cell element
      // you'll use this later, so make sure you use c-y-x
      // TODO: append the table cell to the table row
      row.append(cell);
    }
    // TODO: append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  for (let y = board.length - 1; y >= 0; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
// This function should add a div inside the correct td cell
//   in the HTML game board.This div should have the piece class on it,
//   and should have a class for whether the current player is 1 or 2,
//   like p1 or p2.

function placeInTable(y, x) {
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  const cell = document.getElementById(`c-${y}-${x}`);
  cell.append(piece);
  board[y][x] = currPlayer;
}

/** endGame: announce game end */

function endGame(msg) {
  alert(`Player ${currPlayer} won the game!`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id[4];

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    console.log(checkForWin());
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie

  // TODO: check if all cells in board are filled; if so call, call endGame

  if (board.every((y) => !y.includes(null))) return endGame(`It's a tie!`);

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {
    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    // if all of the elements in one of these arrays is the current player,
    // check for win

    // if (cells.every((cell) => cell === currPlayer)) {
    //   return true;
    // }
    // return false;
    // console.log(`win ${cells}`);
    // for (let cell of cells) {
    //   let y = cell[0];
    //   let x = cell[1];
    //   if (y >= 0 && y <= HEIGHT - 1 && x >= 0 && x <= WIDTH - 1) {
    //     if (board[y][x] !== currPlayer) {
    //       return undefined;
    //     }
    //   }
    // }
    // return true;

    for (let cell of cells) {
      let y = cell[0];
      let x = cell[1];
      if (y >= 0 && y <= HEIGHT - 1 && x >= 0 && x <= WIDTH - 1) {
        if (board[y][x] !== currPlayer) {
          return undefined;
        }
      } else {
        return undefined;
      }
    }
    return true;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      let diagDR = [
        [y, x],
        [y - 1, x + 1],
        [y - 2, x + 2],
        [y - 3, x + 3],
      ];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

setTimeout(() => {
  document
    .querySelector("#restartGameButton")
    .addEventListener("click", function () {
      window.location.reload();
      return false;
    });
}, 2000);

makeBoard();
makeHtmlBoard();
