//defines all the single cell object


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
}