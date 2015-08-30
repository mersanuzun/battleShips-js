function Board(){
    this.ships = [];
    this.board = [
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""],
        ["","","","","","","","","",""]
    ]
}
Board.prototype.addShip = function(ship){
    this.ships.push(ship);
}
Board.prototype.hit = function(x, y){
    return (this.ships.reduce(function(result, ship){
        for (var i = 0; i < ship.coordinates.length; i++){
            if (ship.coordinates[i].x == x && ship.coordinates[i].y == y){
                ship.coordinates.splice(i, 1);
                result = true;
                if (ship.coordinates.length == 0) ship.sank = true
                return result;
            }else return result = false
        }
    }, false))
}
module.exports = Board;