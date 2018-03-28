var loadState = {
    preload: function() {
        console.log("Loading assets");

        var loadingText = game.add.text(game.world.centerX, game.world.centerY, "Loading...", {
            font: "30px Arial",
            fill: "#000"
        });
        loadingText.anchor.setTo(0.5,0.5);

        // preload alle images/assets hier onder
        game.load.image("play", "./assets/buttons/play.png");
        game.load.image("pause", "./assets/buttons/pause.png");
        game.load.image("resume", "./assets/buttons/resume.png");
        game.load.image("restart", "./assets/buttons/restart.png");
        game.load.image("bullet", "./assets/enemy/bullet.png");
        game.load.image("jump", "./assets/overlay/jump.png");
        game.load.image("heart0", "./assets/overlay/heart0.png");
        game.load.image("heart1", "./assets/overlay/heart1.png");
        game.load.image("heart2", "./assets/overlay/heart2.png");
        game.load.image("heart3", "./assets/overlay/heart3.png");
        game.load.image("floor", "./assets/world/floor.png");
        game.load.image("lava", "./assets/world/lava.png");
        game.load.image("landscape", "./assets/world/landscape.png");
        game.load.image('platform', './assets/world/platform.png');
        game.load.image("menu-background", "./assets/ui/menu-wallpaper.png");
        game.load.spritesheet('player', './assets/player/Player_sheetBounds.png', 40, 60);
        game.load.spritesheet('saw', './assets/world/obstacles/saw.png', 40, 40);
        game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        game.load.image('bill', './assets/enemy/bill.png');
    },
    create: function() {
        game.state.start("menu");
    }
};
