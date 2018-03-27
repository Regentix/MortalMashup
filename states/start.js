var player, stateButton, gyroMovementX, weapon, jumpButton, direction, floor, fpsText, lookDirection, shot, cursors;
var moving = false;
var startState = {
    create: function() {
        console.log("Game started");

        fpsText = game.add.text(window.innerWidth - 44, 10, "fps: 0", {
            font: "24px Arial",
            fill: "#000"
        });
        fpsText.anchor.setTo(1,0);

        floor = game.add.sprite(game.world.centerX, game.world.centerY, 'floor');
        floor.anchor.setTo(0.5);
        game.physics.arcade.enable(floor);
        floor.body.immovable = true;

        stateButton = game.add.sprite(window.innerWidth - 10, 10, 'pause');
        stateButton.anchor.setTo(1,0);
        stateButton.inputEnabled = true;
        stateButton.events.onInputDown.add(this.toggleState, this);

        jumpButton = game.add.sprite(window.innerWidth - 10, window.innerHeight - 10, 'jump');
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

        player.animations.add('walkR', [0,1,2,3,4,5,6,7], 10, true);
        player.animations.add('walkL', [8,9,10,11,12,13,14,15], 10, true);

        player.animations.add('restR', [16,17,18,19], 5, true);
        player.animations.add('restL', [20,21,22,23], 5, true);

        player.animations.add('diedR', [24,25,26,27,28,29,30], 1, false);
        player.animations.add('diedL', [31,32,33,34,35,36,37], 1, false);

        player.animations.add('shotR', [38,39,40,41], 10, false);
        player.animations.add('shotL', [42,43,44,45], 10, false);

        player.animations.add('jumpR', [46], 1, false);
        player.animations.add('jumpL', [47], 1, false);

        cursors = game.input.keyboard.createCursorKeys();
        window.addEventListener("deviceorientation", this.handleOrientation, false);

    },
    update: function() {
        fpsText.setText("fps: " + game.time.fps);
        game.physics.arcade.collide(player, floor);
        if (game.input.pointer1.isDown) {
            if (game.input.x > window.innerWidth / 2) {
                weapon.fireAngle = 0;
                player.animations.play('shotR', 20, false);
                weapon.fire();
            }
            else {
                weapon.fireAngle = 180;
                player.animations.play('shotL', 20, false);
                weapon.fire();
            }
        }
        else {
            if (moving === false && player.body.touching.down) {
                if (lookDirection === 'L') {
                    player.animations.play('restL', 5, true);
                } 
                else {
                    player.animations.play('restR', 5, true)
                }
            }
            if (player.body.touching.down === false) {
                if (lookDirection === 'L') {
                    player.animations.play('jumpL', 1, false);
                }
                else 
                {
                    player.animations.play('jumpR', 1, false);
                }
            }
        }
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

        if (gyroMovementX > 5) {
            moving = true;
        }
        else if (gyroMovementX < -5) {
            moving = true;
        }
        else {
            moving = false;
        }

        if (moving === true) {
            if (gyroMovementX > 0) {
                player.body.velocity.x = 250;
                player.animations.play('walkR', 10, true);
                lookDirection = 'R';
            }
            else {
                player.body.velocity.x = -250;
                player.animations.play('walkL', 10, true);
                lookDirection = 'L';
            }
        }
        if (moving === false) {
            player.body.velocity.x = 0;
        }
    }
};