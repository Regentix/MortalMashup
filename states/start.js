var player;
var startState = {
    create: function() {
        console.log("Game started");

        player = game.add.sprite(160,240,"player");
        player.anchor.setTo(0.5);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        window.addEventListener("deviceorientation", this.handleOrientation, true);
    },
    update: function() {

    },
    handleOrientation: function(e) {
        var x = e.beta;
        player.body.velocity.x += x*2;
    }
};