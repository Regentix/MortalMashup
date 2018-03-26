var player, button;
var startState = {
    create: function() {
        console.log("Game started");

        button = game.add.sprite(window.innerWidth - 10, 10, 'pause');
        button.anchor.setTo(1,0);
        button.inputEnabled = true;
        button.events.onInputDown.add(this.toggleState, this);

        player = game.add.sprite(game.world.centerX,game.world.centerY,"player");
        player.anchor.setTo(0.5);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        window.addEventListener("deviceorientation", this.handleOrientation, true);
    },
    update: function() {

    },
    toggleState: function() {
        game.paused = !game.paused;
        if (game.paused) {
            button.loadTexture('resume', 0);
        }
        else {
            button.loadTexture('pause', 0);
        }
    },
    handleOrientation: function(e) {
        var x = e.beta;
        console.log(x);
        player.body.velocity.x += x*2;
    }
};