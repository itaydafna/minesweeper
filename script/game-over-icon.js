//gameover icon constructor

function GameOverIcon(){
    this.el = document.createElement("div");
    this.el.className = "game-over-icon";
    document.body.appendChild(this.el);
}

GameOverIcon.prototype.moveDown = function(){
    this.el.style.transform = "translateY(5%)";
    return "down";
}

GameOverIcon.prototype.moveUp = function(){
    this.el.style.transform = "translateY(-5%)";
    return "up";
}

//!important - timeouts have to match the .game-over-icon transition time value on CSS
GameOverIcon.prototype.bounce = function () {
    var that = this;
    var down = new Promise(function(fulfill,reject){
        that.moveDown();
        setTimeout(fulfill,200);

    });
    down.then(that.moveUp.bind(that)).then(function(){
        setTimeout(that.bounce.bind(that),200);
    });

}


function removeGameOverIcon() {
    var icon = document.querySelector(".game-over-icon");
    document.body.removeChild(icon);

}