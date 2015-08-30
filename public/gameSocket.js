var socket = io();
socket.on("board", function(data){
    ractive.set("player1Board", data)
})
socket.on("player", function(player){
    ractive.push("players", player);
    console.log(player)
    ractive.set("player1Board", player.board.board)
})