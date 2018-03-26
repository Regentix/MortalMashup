var game;
function createGame() {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, "");
    game.state.add("boot", bootState);
    game.state.add("load", loadState);
    game.state.add("menu", menuState);
    game.state.add("start", startState);
    game.state.start("boot");
}



