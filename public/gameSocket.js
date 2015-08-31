var socket = io();
socket.on("board", function(data){
    ractive.set("player1Board", data)
})
socket.on("start-game", function(data){
    if (data.players.length == 2){
        if (ractive.get("player") != null){
            ractive.set("opponent", data.players[1]);
        }else{
            ractive.set("player", data.players[1]);
            ractive.set("opponent", data.players[0]);
        }
    }else if(data.players.length == 1){
        ractive.set("player", data.players[0]);
    }
    ractive.set("ships", data.ships)
})