function Board(){
    this.ships = [];
    this.shipNumber = 8;
    this.sunkenShip = 0;
    this.board = [
        ["","","","","",""],
        ["","","","","",""],
        ["","","","","",""],
        ["","","","","",""],
        ["","","","","",""],
        ["","","","","",""],
    ];
}
Board.prototype.placeShip = function(x, y){
    this.board[x][y] = "0" 
}
Board.prototype.hit = function(x, y){
    if (this.board[x][y] == "0"){
        this.board[x][y] = "1";
        this.sunkenShip++;
        return true;
    }else{
        this.board[x][y] = "-1";
        return false;
    }
}
module.exports = Board;