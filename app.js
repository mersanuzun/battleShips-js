var express = require("express");
var Player = require("./libs/Player.js");
var Board = require("./libs/Board.js")
var app = express();
app.use(express.static('public'));
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
port = "5050";
server.listen(port);
console.log("Server is running at", port);
app.use(express.static(__dirname + '/public/'));
app.get("/", function(req, res){
    res.sendfile(__dirname + "/public/index.html");
});
var players = [];
var watcher = [];
var hasTurn = 0;
var readyPlayersNumber = 0;
io.on('connection', function(socket){
    socket.on("player-name", function(name){
        if (players.length == 2){
            watcher.push(name);
        }else{
            socket.player = new Player(socket.id, name);
            socket.player.setBoard(new Board());
            players.push(socket.player)
        }
        io.emit("init", players);
    })
    socket.on("placeShip", function(coor){
        socket.player.board.placeShip(coor.x, coor.y)
        socket.emit("board", socket.player.board.board);
    });
    socket.on("ready", function(){
        if (checkShipNumbers(socket.player.board) == false){
            socket.emit("non-ready")
        }else{
            readyPlayersNumber++;
            socket.emit("ready");
            if (readyPlayersNumber == 2){
                io.emit("start-game", {hasTurn: players[0].playerID});
                return;
            }
            socket.broadcast.emit("opp-ready");
        }
    })
    socket.on("hit", function(data){
        var result = findPlayer(data.oppID).board.hit(data.x, data.y);
        socket.emit("hitResult", {hitResult: result, oppBoardObj: findPlayer(data.oppID).board});
        socket.broadcast.emit("afterHitBoard", findPlayer(data.oppID).board);
        if (findPlayer(data.oppID).board.sunkenShip == findPlayer(data.oppID).board.shipNumber){
            io.emit("gameFinished", {winner: socket.player, lost: findPlayer(data.oppID)});
            return
        }
        changeTurn();
    })
});

function findPlayer(id){
    for(var i = 0; i < players.length; i++){
        if (players[i].playerID == id) break;
    }
    return players[i];
}

function changeTurn(){
    hasTurn = hasTurn == 1 ? 0 : 1;
    io.emit("changeTurn", players[hasTurn].playerID);
}

function checkShipNumbers(board){
    var counter = 0;
    for (var i = 0; i < board.board.length; i++){
        for (var j = 0; j < board.board.length; j++){
            if (board.board[i][j] == "0") counter++;
        }
    }
    if (board.shipNumber == counter) return true;
    else return false;
}