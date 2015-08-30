var express = require("express");
var Cell = require("./libs/Cell.js");
var Ship = require("./libs/Ship.js");
var Player = require("./libs/Player.js");
var Board = require("./libs/Board.js")
var app = express();
app.use(express.static('public'));
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
port = "4545";
server.listen(port);
console.log("Server is running at", port);
app.use(express.static(__dirname + '/public/'));
app.get("/", function(req, res){
    res.sendfile(__dirname + "/public/index.html");
});
var players = {};
s = new Ship("gemi", 2);
b = new Board();
p = new Player("ersan");

s.setShip("H", 1,2)
b.addShip(s)
p.setBoard(b)
console.log(b.board)
console.log(b.ships[0].coordinates.length)

io.on('connection', function(socket){
    socket.on("player-name", function(name){
        players[socket.id] = new Player(socket.id, name);
        players[socket.id].setBoard(new Board());
        socket.emit("player", players[socket.id]);
    })
});

