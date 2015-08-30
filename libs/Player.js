function Player(name){
    this.name = name;
    this.point = 0;
    this.board;
}
Player.prototype.setBoard = function(board){
    this.board = board;
}
module.exports = Player;