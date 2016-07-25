

//defines the GameBoard object and all it's methods

function TableRow() {
    this.el = document.createElement("tr");
}

function GameBoard() {
    this.el = document.createElement("table");
    this.el.className = "game-board";
    this.mineCounter = 0;
}

GameBoard.prototype.createCellsArray = function () {
    this.cellsNodeList = this.el.querySelectorAll("td");
    return this.cellsArray = Array.prototype.slice.call(this.cellsNodeList);
}


GameBoard.prototype.render = function () {
    document.body.appendChild(this.el);
}

GameBoard.prototype.createGameBoard = function (gridSize) {
    //if gridSize is not passed it will be given a random number between 5 and 18
    var gridSize = gridSize || Math.floor(13 * Math.random()) + 5,
        i = 0;

    for (i; i < gridSize; i++) {
        var row = new TableRow();
        for (var j = 0; j < gridSize; j++) {
            var cell = new Cell();
            var lid = new cell.Lid();
            lid.el.addEventListener("click",removeLid);
            lid.el.addEventListener("contextmenu",flagToggle);
            cell.el.dataset.cell = j;
            cell.el.addEventListener("lidOff",afterLidOff.bind(cell));
            cell.el.appendChild(lid.el);
            row.el.appendChild(cell.el);

            //condition which counts each mine which is added to the board
            if (cell.el.className === "mine"){
                this.mineCounter ++;
            }
        }
        row.el.dataset.row = i;
        this.el.appendChild(row.el);
    }
    // this renders the initial number of mines to the panel
    updatePanelCounter(this.mineCounter);
}


GameBoard.prototype.resetGameBoard = function () {
    //dlelete current table
    document.body.removeChild(document.querySelector(".game-board"));

    // reset timer

    clearTimeout(pauseTimer);
    var timer = document.querySelector(".current-sec");
    timer.textContent = 0;

    //remove gameover icon
    if(document.body.querySelector(".game-over-icon")) {
        removeGameOverIcon()
    }
    //create a new one instead
    newGameBoard();

    //re-add "check!" click event listener
    check.addEventListener("click",verify);

}
