function Cell() {
    this.el = document.createElement("td");
    this.rowNum = 0;
    this.cellNum = 0;
    this.neighborMinesCounter = 0;
    this.mine = (function () {
        if (Math.round(0.6*Math.random())) {
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
        this.el.dataset.flagged = "no";
        //event which indicates lid has been take off cell
        // this.lidOff = new Event("lidOff");
    };

    //method which removes the lid from cell and dispatches "lidOff" event
    // this.Lid.prototype.removeLid = function () {
    //     this.el.parentNode.dispatchEvent(this.lidOff);
    //     this.el.parentNode.removeChild(this.el);
    //
    // };

}



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
        } else {
            //random number between 1 and 3
            var randomDog = Math.floor(3*Math.random())+1
            td.style.backgroundImage = "url(dog-pooping"+randomDog+".png)"
        }
    }
}


// this function adds numbers to every none-mine cell on the table:

function numberEmptyCells(table){
    var allCellsArr = table.createCellsArray();
    allCellsArr.forEach(addNumbers);
}




//event which indicates lid has been take off cell
var lidOff = new Event("lidOff");

//function which removes lid from cell and dispatches "lidOff" event
function removeLid(event){
    event.target.parentNode.dispatchEvent(lidOff);
    if (event.target.parentNode !== null) {
        event.target.parentNode.removeChild(event.target);
    }
};



//this function detrmines what happens after a lid-off event
// it takes the td element of the cell which dispatched the event.

function afterLidOff(event){
    if (event.target.className === "mine"){
        gameOver();
    } else if
    (event.target.dataset.numInCell === "0"){
        lidOffNeigborCells(event.target);

    }

}

//this function takes lid off (runs lidOff on it) from all neighbors of "0" cells

function lidOffNeigborCells(td) {
    var rowNumber = Number(td.parentNode.dataset.row),
    cellNumber = Number(td.dataset.cell);

//top-left neighbor
    var topLeft = document.body.querySelector("tr[data-row ='" + [rowNumber - 1] + "'] td[data-cell='" + [cellNumber - 1] + "']");
    if (!topLeft) {

    } else {
        var childLid = topLeft.querySelector(".lid");
        if (childLid!==null) {
            topLeft.removeChild(childLid);
            var lidOff = new Event("lidOff");
            topLeft.dispatchEvent(lidOff);
        }

    }

//top neighbor
    var top = document.body.querySelector("tr[data-row ='" + [rowNumber - 1] + "'] td[data-cell='" + cellNumber + "']");
    if (!top) {

    } else {
        var childLid = top.querySelector(".lid");
        if (childLid!==null) {
            top.removeChild(childLid);
            var lidOff = new Event("lidOff");
            top.dispatchEvent(lidOff);
        }
    }



// top-right neighbor
    var topRight = document.body.querySelector("tr[data-row ='" + [rowNumber - 1] + "'] td[data-cell='" + [cellNumber + 1] + "']");
    if (!topRight) {

    } else{
        var childLid = topRight.querySelector(".lid");
        if (childLid!==null) {
            topRight.removeChild(childLid);
            var lidOff = new Event("lidOff");
            topRight.dispatchEvent(lidOff);
        }
    }



// left neighbor
    var left = document.body.querySelector("tr[data-row ='" + rowNumber + "'] td[data-cell='" + [cellNumber - 1] + "']");
    if (!left) {

    } else{
        var childLid = left.querySelector(".lid");
        if (childLid!==null) {
            left.removeChild(childLid);
            var lidOff = new Event("lidOff");
            left.dispatchEvent(lidOff);
        }
    }



// right neighbor
    var right = document.body.querySelector("tr[data-row ='" + rowNumber + "'] td[data-cell='" + [cellNumber + 1] + "']");
    if (!right) {

    } else{
        var childLid = right.querySelector(".lid");
        if (childLid!==null) {
            right.removeChild(childLid);
            var lidOff = new Event("lidOff");
            right.dispatchEvent(lidOff);
        }
    }



// bottom-left neighbor
    var bottomLeft = document.body.querySelector("tr[data-row ='" + [rowNumber + 1] + "'] td[data-cell='" + [cellNumber - 1] + "']");
    if (!bottomLeft) {

    } else{
        var childLid = bottomLeft.querySelector(".lid");
        if (childLid!==null) {
            bottomLeft.removeChild(childLid);
            var lidOff = new Event("lidOff");
            bottomLeft.dispatchEvent(lidOff);
        }
    }



// bottom neighbor
    var bottom = document.body.querySelector("tr[data-row ='" + [rowNumber + 1] + "'] td[data-cell='" + cellNumber + "']");
    if (!bottom) {

    } else{
        var childLid = bottom.querySelector(".lid");
        if (childLid!==null) {
            bottom.removeChild(childLid);
            var lidOff = new Event("lidOff");
            bottom.dispatchEvent(lidOff);
        }
    }



//bottom-right neighbor
    var bottomRight = document.body.querySelector("tr[data-row ='" + [rowNumber + 1] + "'] td[data-cell='" + [cellNumber + 1] + "']");
    if (!bottomRight) {

    } else {
        var childLid = bottomRight.querySelector(".lid");
        if (childLid!==null) {
            bottomRight.removeChild(childLid);
            var lidOff = new Event("lidOff");
            bottomRight.dispatchEvent(lidOff);
        }
    }



}

//function that controls flag toggle

function flagToggle(event){
    var mineCounter = document.querySelector(".mine-total"),
        mineTotal = Number(mineCounter.textContent);
    event.preventDefault();
    if (event.target.dataset.flagged === "no"){
        event.target.dataset.flagged = "yes";
        var flag = document.createElement("div");
        flag.className = "flag";
        event.target.appendChild(flag);
        mineTotal--;
        updatePanelCounter(mineTotal);

    } else if
    (event.target.className === "flag"){
        event.target.parentNode.dataset.flagged = "no";
        event.target.parentNode.removeChild(event.target);
        mineTotal++;
        updatePanelCounter(mineTotal);
    }

}

//function that updates the mine counter on panel

function updatePanelCounter(number){
    var mineCounter = document.querySelector(".mine-total"),
        checkButton = document.querySelector(".check");
    if (number===0){
        checkButton.id = "done-flagging";
    } else {
        checkButton.id = "";
    }
    mineCounter.textContent = number;
}



//declaring a global variable which will allow me to pause timer (clearTimeout) after game over or win
var pauseTimer;
//function that updates timer
function updateTimer(){
    var timer = document.querySelector(".current-sec"),
        currentTime = Number(timer.textContent);
    currentTime++;
    timer.textContent = currentTime;
    pauseTimer = setTimeout(updateTimer,1000);
}





function gameOver (){
    var cellsNodeList = document.querySelectorAll("td"),
        cellsArray = Array.prototype.slice.call(cellsNodeList);
        cellsArray.forEach(function(td){
            var lid = td.querySelector(".lid"),
                flag = td.querySelector(".flag");
            if(lid!==null)
            {td.removeChild(lid)};})
    clearTimeout(pauseTimer);
    alert("GAME OVER\nOH NO!\nYou stepped on some dog-poop :(\nClick 'Restart' to try again");

    //makes game-over icon bounce on screen;
    var gameOverIcon = new GameOverIcon();
    gameOverIcon.el.style.background = "url(game-over.png) no-repeat"
    gameOverIcon.bounce();
}


//this function verifies if correct when player is done flagging

function verify(){
    var cellsNodeList = document.querySelectorAll("td"),
        success = true;
        cellsArray = Array.prototype.slice.call(cellsNodeList);
        cellsArray.forEach(function(td) {
                var lid = td.querySelector(".lid");
                //detects "false-positive" cases

                if ((lid !==null)&&(lid.dataset.flagged === "yes")) {
                    if (td.className === "no-mine") {
                        success = false;

                    }
                }
                ;
                //detects "false-negetive" cases

                if ((lid !==null)&&(lid.dataset.flagged === "no")) {
                    if (td.className === "mine") {
                        success = false;
                    }
                }
            }
        )

    if (success===true){
        clearTimeout(pauseTimer);

    alert("HURRAY!\nYou Made It!\n You found all the poop and didn't step on any :)\nClick 'Restart' to play again")
        var gameOverIcon = new GameOverIcon();
        gameOverIcon.el.style.background = "url(success.jpg) grey no-repeat"
        gameOverIcon.bounce();
    } else{
        gameOver();
    }
}




//check button element and "click" event listener;

var check = document.querySelector(".check");
check.addEventListener("click",verify);



//this gets everything started
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

var check = document.querySelector(".restart");
check.addEventListener("click",GameBoard.prototype.resetGameBoard.bind(testTable));




