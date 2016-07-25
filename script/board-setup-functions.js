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


//this function adds numbers (and random pooping dogs)to none-mine cells

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
            td.style.backgroundImage = "url(img/dog-pooping"+randomDog+".png)"
        }
    }
}


// this function adds numbers to every none-mine cell on the table:

function numberEmptyCells(table){
    var allCellsArr = table.createCellsArray();
    allCellsArr.forEach(addNumbers);
}

