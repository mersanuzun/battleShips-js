var express = require("express");
var Ship = require("./libs/Ship.js");
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
var readyPlayersNumber = 0;
p = new Player("asdasd");
b = new Board();
s = new  Ship(1,2)
b.placeShip(s);
p.setBoard(b);
console.log(p.board.hit(1,22))
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
        socket.player.board.placeShip(new Ship(coor.x, coor.y))
        console.log(socket.player)
    });
    socket.on("ready", function(){
        readyPlayersNumber++;
        if (readyPlayersNumber == 2){
            io.emit("start-game")
        }
        console.log(readyPlayersNumber)
    })
    socket.on("hit", function(data){
        console.log(findPlayer(data.oppID).board.hit(data.x, data.y))
    })
});

function findPlayer(id){
    for(var i = 0; i < players.length; i++){
        if (players[i].playerID == id) break;
    }
    return players[i];
}