var loadState = {
    preload: function() {
        console.log("Loading assets");

        var loadingText = game.add.text(game.world.centerX, game.world.centerY, "Loading...", {
            font: "30px Arial",
            fill: "#000"
        });
        loadingText.anchor.setTo(0.5,0.5);

        // preload alle images/assets hier onder
        game.load.image("play", "./assets/play.png");
        game.load.image("player","./assets/player.png");
        game.load.image("pause", "./assets/pause.png");
        game.load.image("resume", "./assets/resume.png");
    },
    create: function() {
        game.state.start("menu");
    }
};