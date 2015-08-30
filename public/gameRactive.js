var ractive = new Ractive({
    el: '#container',
    template: '#template',
    data: { 
        player1Board: [],
        player2Board: [],
        gamePhase:'take-player-name',
        players : []
    }
});
ractive.on("sendName", function(e, name){
    socket.emit("player-name", name)
    this.set("gamePhase", "game-area")
})