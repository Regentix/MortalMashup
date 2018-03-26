var bootState = {
    create: function() {
        console.log("Initiating boot state");

        game.stage.backgroundColor = "#EAEAEA";
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // call load state
        game.state.start('load');
    }
};