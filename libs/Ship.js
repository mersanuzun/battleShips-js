var Cell = require("./Cell.js");
function Ship(name, size){
    this.name = name;
    this.size = size;
    this.coordinates = [];
    this.sank = false;
}
Ship.prototype.setShip = function(direction, x, y){
    switch(direction){
        case "H":
            for(var i = y; this.coordinates.length < this.size; i++){
                this.coordinates.push(new Cell(x, i))
            }
            break;
        case "V":
            for(var i = x; this.coordinates.length < this.size; i++){
                this.coordinates.push(new Cell(i, y))
            }
            break;
    }
}
module.exports = Ship