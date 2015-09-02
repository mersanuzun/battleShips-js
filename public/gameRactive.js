var ractive = new Ractive({
    el: '#container',
    template: '#template',
    data: { 
        player: null,
        opponent: null,
        gamePhase: "player-name",
        ships: null,
        hasTurn: null,
        ready: false,
        status: null
    }
});
ractive.on("sendName", function(e, name){
    if (name){
        socket.emit("player-name", name)
        this.set("gamePhase", "ship-placement")   
    }
})
ractive.on("placeShip", function(e, x, y){
    event.target.className = 'ship';
    this.set("player.board.shipNumber", this.get('player.board.shipNumber') - 1)
    socket.emit("placeShip", {x: x, y: y});
})
ractive.on("hit", function(e, x, y){
    socket.emit("hit", {x: x, y: y, oppID: this.get("opponent.playerID")})
})
ractive.on("ready", function(){
    socket.emit("ready")
})