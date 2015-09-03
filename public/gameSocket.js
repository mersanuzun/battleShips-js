var socket = io();
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
socket.on("start-game", function(data){
    ractive.set("gamePhase", "game-start");
    ractive.set("gameStatus", "START")
    ractive.set("hasTurn", data.hasTurn)
    setTurn();
})
socket.on("changeTurn", function(hasTurn){
    console.log(hasTurn)
    ractive.set("hasTurn", hasTurn)
    setTurn();
})
socket.on("ready", function(){
    ractive.set("ready", true);
    ractive.set("gameStatus", "Your opponent is expected.")
})
socket.on("non-ready", function(){
    ractive.set("gameStatus", "Please, place more " + ractive.get("player.board.shipNumber") + " ships.")
})
socket.on("opp-ready", function(){
    ractive.set("gameStatus", "Your opponent is ready.")
})
socket.on("board", function(board){
    ractive.set("player.board.board", board);
});
socket.on("hitResult", function(data){
    ractive.set("opponent.board", data.oppBoardObj);
    ractive.set("hitResult", data.hitResult)
})
socket.on("afterHitBoard", function(boardObj){
    console.log("asd")
    ractive.set("player.board", boardObj);
})
socket.on("gameFinished", function(data){
    if (ractive.get("player.playerID") == data.winner.playerID)
        ractive.set("gameStatus", "You Win.")
    else
        ractive.set("gameStatus", "You Lost.")
    ractive.set("gamePhase", "game-finished");
})

