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
        /*game.load.image("player","./assets/player.png");*/
        game.load.image("pause", "./assets/pause.png");
        game.load.image("resume", "./assets/resume.png");
        game.load.image("bullet", "./assets/bullet.png");
        game.load.image("fire_L", "./assets/buttons/fire_L.png");
        game.load.image("fire_R", "./assets/buttons/fire_R.png");
        game.load.image("jump", "./assets/buttons/jump.png");
        game.load.image("floor", "./assets/world/floor.png");
        game.load.spritesheet('player', './assets/player/Player_sheet.png', 30, 30);
    },
    create: function() {
        game.state.start("menu");
    }
};