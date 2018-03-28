var bootState = {
    create: function() {
        console.log("Booting game");

        game.stage.backgroundColor = "#582a36";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.desiredFps = 60;
        game.time.advancedTiming = true;

        // call load state
        game.state.start('load');
    }
};