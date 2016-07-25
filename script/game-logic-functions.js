
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

    //remove click event listener from check

    check.removeEventListener("click",verify);

    alert("GAME OVER\nOH NO!\nYou stepped on some dog-poop :(\nClick 'Restart' to try again");

    //makes game-over icon bounce on screen;
    var gameOverIcon = new GameOverIcon();
    gameOverIcon.el.style.background = "url(img/game-over.png) no-repeat"
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
        gameOverIcon.el.style.background = "url(img/success.jpg) grey no-repeat";
        check.removeEventListener("click",verify);
        gameOverIcon.bounce();
    } else{
        gameOver();
    }
}


