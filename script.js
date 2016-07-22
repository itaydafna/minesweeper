function Cell() {
    this.el = document.createElement("td");
    this.rowNum = 0;
    this.cellNum = 0;
    this.neighborMinesCounter = 0;
    this.mine = (function () {
        if (Math.round(0.75*Math.random())) {
            this.el.className = "mine";
            return true
        } else {
            this.el.className = "no-mine";
            return false
        }
    }.call(this));
    this.that = this;
    this.Lid = function(){
        this.el = document.createElement("div");
        this.el.className = "lid";
        //event which indicates lid has been take off cell
        this.lidOff = new Event("lidOff");
    };

    //method which removes the lid from cell and dispatches "lidOff" event
    this.Lid.prototype.removeLid = function () {
        this.el.parentNode.dispatchEvent(this.lidOff);
        this.el.parentNode.removeChild(this.el);

    };

}



function TableRow() {
    this.el = document.createElement("tr");
}

function GameBoard() {
    this.el = document.createElement("table");
    this.el.className = "game-board";
}

GameBoard.prototype.createCellsArray = function () {
    this.cellsNodeList = this.el.querySelectorAll("td");
   return this.cellsArray = Array.prototype.slice.call(this.cellsNodeList);
}


GameBoard.prototype.render = function () {
    document.body.appendChild(this.el);
}

GameBoard.prototype.createGameBoard = function (gridSize) {
    //if gridSize is not passed it will be given a random number between 5 and 24
    var gridSize = gridSize || Math.floor(20 * Math.random()) + 5,
        i = 0;

    for (i; i < gridSize; i++) {
        var row = new TableRow();
        for (var j = 0; j < gridSize; j++) {
            var cell = new Cell();
            var lid = new cell.Lid();
            lid.el.addEventListener("click",cell.Lid.prototype.removeLid.bind(lid));
            cell.el.dataset.cell = j;
            cell.el.addEventListener("lidOff",afterLidOff.bind(cell));
            cell.el.appendChild(lid.el);
            row.el.appendChild(cell.el);
        }
        row.el.dataset.row = i;
        this.el.appendChild(row.el);
    }
}

/////////////
//functions//
/////////////

//function that counts the number of "mine" neighbors a cell has

function numMineNeighbors (td) {

    var counter = 0,
        rowNumber = Number(td.parentNode.dataset.row),
        cellNumber = Number(td.dataset.cell);

//top-left neighbor
    var topLeft = document.body.querySelector("tr[data-row ='" + [rowNumber - 1] + "'] td[data-cell='" + [cellNumber - 1] + "']");
    if (!topLeft) {
        counter + 0
    }
    else if (topLeft.className === "mine") {
        counter++;
    }

//top neighbor
    var top = document.body.querySelector("tr[data-row ='" + [rowNumber - 1] + "'] td[data-cell='" + cellNumber + "']");
    if (!top) {
        counter + 0
    }
    else if (top.className === "mine") {
        counter++;
    }

// top-right neighbor
    var topRight = document.body.querySelector("tr[data-row ='" + [rowNumber - 1] + "'] td[data-cell='" + [cellNumber + 1] + "']");
    if (!topRight) {
        counter + 0
    }
    else if (topRight.className === "mine") {
        counter++;
    }

// left neighbor
    var left = document.body.querySelector("tr[data-row ='" + rowNumber + "'] td[data-cell='" + [cellNumber - 1] + "']");
    if (!left) {
        counter + 0
    }
    else if (left.className === "mine") {
        counter++;
    }

// right neighbor
    var right = document.body.querySelector("tr[data-row ='" + rowNumber + "'] td[data-cell='" + [cellNumber + 1] + "']");
    if (!right) {
        counter + 0
    }
    else if (right.className === "mine") {
        counter++;
    }

// bottom-left neighbor
    var bottomLeft = document.body.querySelector("tr[data-row ='" + [rowNumber + 1] + "'] td[data-cell='" + [cellNumber - 1] + "']");
    if (!bottomLeft) {
        counter + 0
    }
    else if (bottomLeft.className === "mine") {
        counter++;
    }

// bottom neighbor
    var bottom = document.body.querySelector("tr[data-row ='" + [rowNumber + 1] + "'] td[data-cell='" + cellNumber + "']");
    if (!bottom) {
        counter + 0
    }
    else if (bottom.className === "mine") {
        counter++;
    }

//bottom-right neighbor
    var bottomRight = document.body.querySelector("tr[data-row ='" + [rowNumber + 1] + "'] td[data-cell='" + [cellNumber + 1] + "']");
    if (!bottomRight) {
        counter + 0
    }
    else if (bottomRight.className === "mine") {
        counter++;
    }

    return counter;
}


//this function adds numbers to none-mine cells

function addNumbers(td){

    if (td.className === "no-mine"){
        var neighborMinesNum = numMineNeighbors(td);
        td.dataset.numInCell = neighborMinesNum;
        if(neighborMinesNum>0){
            var numInCell = document.createElement("span");
                numInCell.textContent = neighborMinesNum;
                numInCell.className = "number";
                td.appendChild(numInCell);
        }
    }
}


// this function adds numbers to every none-mine cell on the table:

function numberEmptyCells(table){
    var allCellsArr = table.createCellsArray();
    allCellsArr.forEach(addNumbers);
}



//this function detrmines what happens after a lid-off event
// it takes the td element of the cell which dispatched the event.

function afterLidOff(event){
    if (event.target.className === "mine"){
        alert ("game over!");
    } else if
    (event.target.dataset.numInCell === "0"){
     alert("need to think how to write this..")
    }

}





//this gets everything started

var testTable = new GameBoard();
testTable.createGameBoard();
testTable.render();
numberEmptyCells(testTable);







