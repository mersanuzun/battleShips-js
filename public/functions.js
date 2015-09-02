function setTurn(){
    if (ractive.get("hasTurn") == ractive.get("player.playerID")){
        ractive.set("gameStatus", "Your turn.")
    }else
        ractive.set("gameStatus", "Your opponent turn.")
        
}