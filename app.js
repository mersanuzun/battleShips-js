var express = require("express");
var Cell = require("./libs/Cell.js");
var Ship = require("./libs/Ship.js");
var BattleShips = require("./libs/BattleShips.js")
var app = express();
app.use(express.static('public'));
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
port = "4545";
server.listen(port);
console.log("Server is running at", port);
app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res){
  res.sendfile(__dirname + "/public/index.html");
});


s = new Ship("gemi", 2)
b = new BattleShips();
s.setShip("H",1,2)
b.addShip(s)
console.log(b.hit(1,3))
console.log(b.hit(1,2))
console.log(b)
console.log(s)