var gamePhases = [
    "player-name",
    "game-area"
]

var ractive = new Ractive({
    el: '#container',
    template: '#template',
    data: { 
        player: null,
        opponent: null,
        gamePhase: gamePhases[0],
        ships: null
    }
});
ractive.on("sendName", function(e, name){
    if (name){
        socket.emit("player-name", name)
        this.set("gamePhase", gamePhases[1])   
    }
})
ractive.on("placeShip", function(e, x, y){
    console.log(x, y)
})