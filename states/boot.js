var bootState = {
    create: function() {
        console.log("Booting game");

        game.stage.backgroundColor = "#EAEAEA";
        game.physics.startSystem(Phaser.Physics.P2JS); // Polygonal body shape
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // call load state
        game.state.start('load');
    }
};