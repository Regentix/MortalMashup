var bootState = {
    create: function() {
        console.log("Booting game");

        game.stage.backgroundColor = "#bbe7ad";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.desiredFps = 60;
        game.time.advancedTiming = true;

        // call load state
        game.state.start('load');
    }
};