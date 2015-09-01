function Board(){
    this.ships = [];
    this.shipNumber = 8;
    this.board = [
        ["","","","","",""],
        ["","","","","",""],
        ["","","","","",""],
        ["","","","","",""],
        ["","","","","",""],
        ["","","","","",""],
    ]
}
Board.prototype.placeShip = function(ship){
    this.ships.push(ship);
}
Board.prototype.hit = function(x, y){
    for(var i = 0; i < this.ships.length; i++){
        if (this.ships[i].x == x && this.ships[i].y == y){
            this.board[x][y] = "1";
            this.ships[i].sank = true;
            break;
        }
    }
    if (i < this.ships.length - 1){
        return true;
    }else return false;
}
module.exports = Board;