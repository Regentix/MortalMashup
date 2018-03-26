var player, button, gyroMovementX;
var moving = false;
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

        window.addEventListener("deviceorientation", this.handleOrientation, false);
    },
    update: function() {

    },
    toggleState: function() {
        game.paused = !game.paused;
        if (game.paused) {
            button.loadTexture('resume', 0);
            console.log("Game paused");
        }
        else {
            button.loadTexture('pause', 0);
            console.log("Game resumed");
        }
    },
    handleOrientation: function(e) {
        gyroMovementX = e.beta;

        // 7 is de grens vanaf deze hoeveelheid 'tilt' zal hij iets doen
        // 250 is de snelheid

        if (gyroMovementX > 7 || gyroMovementX < -7) {
            moving = true;
        }
        else {
            moving = false
        }

        if (moving == true) {
            if (gyroMovementX > 0) {
                player.body.velocity.x = 250; // * Time.deltaTime please
            }
            else {
                player.body.velocity.x = -250
            }
        }
        else {
            player.body.velocity.x = 0;
        }
    }
};