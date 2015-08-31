var express = require("express");
var Cell = require("./libs/Cell.js");
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
var ships = [];
var shipNames = [
    {name: "Aircraft Carrier", size: 5},
    {name: "Battleship", size: 4},
    {name: "Submarine", size: 3},
    {name: "Destroyer", size: 3},
    {name: "Patrol Boat", size: 2}
];
shipNames.forEach(function(s){
    ships.push(new Ship(s.name, s.size));
})
console.log(ships)
io.on('connection', function(socket){
    socket.on("player-name", function(name){
        if (players.length == 2){
            watcher.push(name);
        }else{
            socket.player = new Player(socket.id, name);
            socket.player.setBoard(new Board());
            players.push(socket.player)
        }
        io.emit("start-game", {players: players, ships: ships});
    })
});

