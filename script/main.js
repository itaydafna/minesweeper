//check button element and "click" event listener;

var check = document.querySelector(".check");
check.addEventListener("click",verify);


//this gets everything started

//constructor defined on game-board.js
function newGameBoard () {
var testTable = new GameBoard();
testTable.createGameBoard();
testTable.render();
numberEmptyCells(testTable);
setTimeout(updateTimer,1000);
    return testTable;
}

var testTable = newGameBoard();



// reset button element and "click" event listener;

var restart = document.querySelector(".restart");
restart.addEventListener("click",GameBoard.prototype.resetGameBoard.bind(testTable));
