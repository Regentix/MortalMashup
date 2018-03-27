var player, stateButton, gyroMovementX, weapon, fireButton_L, fireButton_R, jumpButton, direction, floor;
var moving = false;
var isShooting = false;
var startState = {
    create: function() {
        console.log("Game started");

        floor = game.add.sprite(game.world.centerX, game.world.centerY, 'floor');
        floor.anchor.setTo(0.5);
        game.physics.arcade.enable(floor);
        floor.body.immovable = true;

        stateButton = game.add.sprite(window.innerWidth - 10, 10, 'pause');
        stateButton.anchor.setTo(1,0);
        stateButton.inputEnabled = true;
        stateButton.events.onInputDown.add(this.toggleState, this);

        fireButton_L = game.add.sprite(10, window.innerHeight - 10, 'fire_L');
        fireButton_L.anchor.setTo(0,1);
        fireButton_L.inputEnabled = true;
        fireButton_L.events.onInputDown.add(this.fireLeft, this);
        fireButton_L.events.onInputUp.add(this.resetFire, this);

        fireButton_R = game.add.sprite(window.innerWidth - 10, window.innerHeight - 10, 'fire_R');
        fireButton_R.anchor.setTo(1,1);
        fireButton_R.inputEnabled = true;
        fireButton_R.events.onInputDown.add(this.fireRight, this);
        fireButton_R.events.onInputUp.add(this.resetFire, this);

        jumpButton = game.add.sprite(window.innerWidth - 10, window.innerHeight - 120, 'jump');
        jumpButton.anchor.setTo(1,1);
        jumpButton.inputEnabled = true;
        jumpButton.events.onInputDown.add(this.jump, this);

        player = game.add.sprite(game.world.centerX,game.world.centerY - 100,"player");
        player.anchor.setTo(0.5);
        game.physics.arcade.enable(player);
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true;

        weapon = game.add.weapon(30, "bullet");
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 400;
        weapon.fireRate = 400;
        weapon.trackSprite(player, 0, 0);

        window.addEventListener("deviceorientation", this.handleOrientation, false);
    },
    update: function() {
        if (isShooting) {
            if (direction === "L") {
                weapon.fireAngle = 180;
                weapon.fire();
            } else {
                weapon.fireAngle = 0;
                weapon.fire();
            }
        }
        game.physics.arcade.collide(player, floor);
    },
    fireLeft: function() {
        isShooting = true;
        direction = "L";
    },
    fireRight: function() {
        isShooting = true;
        direction = "R";
    },
    resetFire: function() {
        isShooting = false;
    },
    jump: function() {
        if (player.body.touching.down) {
            player.body.velocity.y = -250;
        }
    },
    toggleState: function() {
        game.paused = !game.paused;
        if (game.paused) {
            stateButton.loadTexture('resume', 0);
            console.log("Game paused");
        }
        else {
            stateButton.loadTexture('pause', 0);
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

        if (moving === true) {
            if (gyroMovementX > 0) {
                player.body.velocity.x = 250; // * Time.deltaTime please!
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