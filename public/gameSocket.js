var socket = io();
socket.on("board", function(data){
    ractive.set("player1Board", data)
})
socket.on("init", function(players){
    if (players.length == 2){
        if (ractive.get("player") != null){
            ractive.set("opponent", players[1]);
        }else{
            ractive.set("player", players[1]);
            ractive.set("opponent", players[0]);
        }
    }else if(players.length == 1){
        ractive.set("player", players[0]);
    }
})
socket.on("start-game", function(){
    ractive.set("gamePhase", "game-start");
})