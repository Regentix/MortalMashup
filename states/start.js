var player;
var startState = {
    create: function() {
        console.log("Game started");

        var pauseButton = game.add.sprite(window.innerWidth - 10, 10, 'pause');
        pauseButton.anchor.setTo(1,0);
        pauseButton.inputEnabled = true;
        pauseButton.events.onInputDown.add(this.pause, this);

        var resumeButton = game.add.sprite(window.innerWidth - 10, 100, 'resume');
        resumeButton.anchor.setTo(1,0);
        resumeButton.inputEnabled = true;
        resumeButton.events.onInputDown.add(this.unpause, this);

        player = game.add.sprite(game.world.centerX,game.world.centerY,"player");
        player.anchor.setTo(0.5);
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        window.addEventListener("deviceorientation", this.handleOrientation, true);
    },
    update: function() {

    },
    pause: function() {
        game.paused = true;
        console.log("Game paused");
    },
    unpause: function() {
        game.paused = false;
        console.log("Game resumed")
    },
    handleOrientation: function(e) {
        var x = e.beta;
        player.body.velocity.x += x*2;
    }
};