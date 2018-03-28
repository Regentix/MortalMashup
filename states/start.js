var player, stateButton, gyroMovementX, weapon, jumpButton, direction, floor, fpsText,landscape, platforms, x, y, rndMap, cursors, floors, lavas, restartButton, saws;
var score = 0, scoreText, highscore, hearts,  animDieR, animDieL;
var health = 3;
var lookDirection = "R";
var moving = false;
var hasDied = false;
var yHeights = [0,340,260,180,120];
var billHeights = [380,300,220,140];
var platformMap = {
    0: [0,1,0,2,0,3,0,4,0,3,0,2,0,1,0,1,0,2,0,3,0,4,0,1,0,2,0,3,0,2,0,1,0,2,0,1,0,1,0,3],
    1: [0,4,0,3,0,2,0,1,0,1,0,2,0,1,0,4,0,3,0,2,0,1,0,3,0,4,0,1,0,1,0,2,0,4,0,3,0,2,0,2],
    2: [0,1,0,2,0,3,0,1,0,2,0,3,0,1,0,2,0,3,0,1,0,2,0,3,0,1,0,2,0,3,0,1,0,2,0,3,0,1,0,2],
    3: [0,4,0,3,0,2,0,3,0,4,0,3,0,2,0,1,0,2,0,3,0,4,0,3,0,2,0,1,0,2,0,3,0,4,0,3,0,2,0,3],
    4: [0,1,0,4,0,3,0,1,0,3,0,2,0,1,0,3,0,2,0,3,0,1,0,2,0,3,0,1,0,1,0,2,0,1,0,3,0,2,0,1]
};
var floorMap = {
    0: [1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1],
    1: [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
    2: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    3: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    4: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
};
var startState = {
    create: function() {
        landscape = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'landscape');
        landscape.anchor.setTo(0.5);
        var backgroundRatio;
        if(window.innerHeight > window.innerWidth) {
            backgroundRatio = window.innerHeight/1920;
        }
        else {
            backgroundRatio = window.innerWidth/1920;
        }
        landscape.scale.setTo(backgroundRatio,backgroundRatio);
        landscape.fixedToCamera = true;

        game.world.setBounds(0, 0, 4000, 500);

        fpsText = game.add.text(window.innerWidth - 44, 10, game.time.fps, {
            font: "24px Arial",
            fill: "#000"
        });
        fpsText.anchor.setTo(1,0);
        fpsText.fixedToCamera = true;

        platforms = this.add.physicsGroup();
        floors = this.add.physicsGroup();
        lavas = this.add.physicsGroup();

        rndMap = game.rnd.integerInRange(0,4);

        console.log("Loading map " + rndMap);

        for (var i = 0, ilen = 40; i < ilen; i++) {
            if (platformMap[rndMap][i] > 0) {
                x = 100 * i;
                y = yHeights[platformMap[rndMap][i]];
                var platform = platforms.create( x , y, 'platform');
                platform.body.immovable = true;
                platform.anchor.setTo(1,0);
            }
        }

        for (var j = 0, jlen = 40; j < jlen; j++) {
            x = 100 * j;
            if (floorMap[rndMap][j] === 1) {
                var floor = floors.create( x , 500, 'floor');
                floor.body.immovable = true;
                floor.anchor.setTo(0,1);
            }
            else {
                var lava = lavas.create( x , 500, 'lava');
                lava.body.immovable = true;
                lava.anchor.setTo(0,1);
            }
        }


        stateButton = game.add.sprite(window.innerWidth - 10, 10, 'pause');
        stateButton.anchor.setTo(1,0);
        stateButton.inputEnabled = true;
        stateButton.events.onInputDown.add(this.toggleState, this);
        stateButton.fixedToCamera = true;

        restartButton = game.add.sprite(window.innerWidth - 10, 40, 'restart');
        restartButton.anchor.setTo(1,0);
        restartButton.inputEnabled = true;
        restartButton.events.onInputDown.add(this.restart, this);
        restartButton.fixedToCamera = true;

        jumpButton = game.add.sprite(window.innerWidth - 10, window.innerHeight - 10, 'jump');
        jumpButton.anchor.setTo(1,1);
        jumpButton.inputEnabled = true;
        jumpButton.events.onInputDown.add(this.jump, this);
        jumpButton.fixedToCamera = true;

        saws = this.add.physicsGroup();
        var saw = saws.create(2000, game.world.centerY-100, 'saw');
        saw.body.immovable = true;
        saw.animations.add('saw', [0,1,2], 15, true);
        saw.animations.play('saw', 15, true);
        saw.anchor.setTo(0.5);

        player = game.add.sprite(2000,game.world.centerY-50,"player");
        player.anchor.setTo(0.5);
        game.physics.arcade.enable(player);
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true;
        game.camera.follow(player);

        weapon = game.add.weapon(30, "bullet");
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 400;
        weapon.fireRate = 400;

        hearts = game.add.sprite(10, 35, 'heart3');
        hearts.anchor.setTo(0, 0);
        hearts.fixedToCamera = true;

        highscore = localStorage.getItem('highScore');
        scoreText = game.add.bitmapText(10, 10, 'carrier_command', 'score:0', 15);
        scoreText.anchor.setTo(0, 0);
        scoreText.fixedToCamera = true;

        player.animations.add('walkR', [0,1,2,3,4,5,6,7], 10, true);
        player.animations.add('walkL', [8,9,10,11,12,13,14,15], 10, true);

        player.animations.add('restR', [16,17,18,19], 5, true);
        player.animations.add('restL', [20,21,22,23], 5, true);

        animDieR = player.animations.add('diedR', [24,25,26,27,28,29,30], 1, false);
        animDieL = player.animations.add('diedL', [31,32,33,34,35,36,37], 1, false);

        player.animations.add('shotR', [38,39,40,41], 10, false);
        player.animations.add('shotL', [42,43,44,45], 10, false);

        player.animations.add('jumpR', [46], 1, false);
        player.animations.add('jumpL', [47], 1, false);

        // bulletbills 
        var maxBills = 5;
        var prevValue = 0;
        var bulletBills = this.add.physicsGroup();
        game.physics.arcade.enable(bulletBills);


        for (var i = 1; i < maxBills; i++) {

            var value = game.rnd.integerInRange(0,3);
            while (prevValue === value) {
                value = game.rnd.integerInRange(0,3);
            }
            
            var bulletBill = bulletBills.create(game.world.width, billHeights[value] , 'bill');
            var rndVel = game.rnd.integerInRange(-150, -300);
            bulletBill.body.velocity.x = rndVel;
            bulletBill.checkWorldBounds = true;
            bulletBill.events.onOutOfBounds.add(removeBullet, this);

            prevValue = value;
        }

    function removeBullet() {
        bulletBill.kill();
    }


        cursors = game.input.keyboard.createCursorKeys();
        window.addEventListener("deviceorientation", this.handleOrientation, false);

    },
    update: function() {
        fpsText.setText(game.time.fps);
        game.physics.arcade.collide(player, platforms, null, null, this);
        game.physics.arcade.collide(player, floors, null, null, this);
        game.physics.arcade.collide(player, lavas, this.lavaHit, null, this);
        game.physics.arcade.collide(player, saws, this.takeHit, null, this);

        if (hasDied) {
            this.die();
        }
        else {
            if (game.input.pointer1.isDown) {
                if (game.input.x > window.innerWidth / 2 && game.input.x < window.innerWidth - 161) {
                    weapon.fireAngle = 0;
                    weapon.trackSprite(player, 15, 0);
                    player.animations.play('shotR', 20, false);
                    lookDirection = 'R';
                    weapon.fire();
                } else if (game.input.x > window.innerWidth / 2 && game.input.x > window.innerWidth - 161) {
                    if (game.input.y < window.innerHeight - 85) {
                        weapon.fireAngle = 0;
                        weapon.trackSprite(player, 15, 0);
                        player.animations.play('shotR', 20, false);
                        lookDirection = 'R';
                        weapon.fire();
                    }
                }
                else {
                    weapon.fireAngle = 180;
                    weapon.trackSprite(player, -15, 0);
                    player.animations.play('shotL', 20, false);
                    lookDirection = 'L';
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
        }
        if (cursors.left.isDown)
        {
            player.body.position.x += -7;

            player.animations.play('walkL', true);
            lookDirection = 'L';
        }
        if (cursors.right.isDown)
        {
            player.body.position.x += 7;

            player.animations.play('walkR', true);
            lookDirection = 'R';
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -320;
        }
    },
    jump: function() {
        if (player.body.touching.down) {
            player.body.velocity.y = -320;

            //score += 10;
            //scoreText.setText('Score:' + score);
            //this.takeHit();
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
    restart: function () {
        game.state.restart();
    },
    handleOrientation: function(e) {
        gyroMovementX = e.beta;

        if (gyroMovementX > 3) {
            moving = true;
        }
        else if (gyroMovementX < -3) {
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
    },
    takeHit: function() {
        health -= 1;
        if (health === 2) {
            hearts.loadTexture('heart2', 0);
        }
        else if (health === 1) {
            hearts.loadTexture('heart1', 0);
        }
        else if (health === 0) {
            hearts.loadTexture('heart0', 0);
            hasDied = true;
        }
    },
    lavaHit: function() {
        health -= 1;
        if (health === 2) {
            hearts.loadTexture('heart2', 0);
        }
        else if (health === 1) {
            hearts.loadTexture('heart1', 0);
        }
        else if (health === 0) {
            hearts.loadTexture('heart0', 0);
            hasDied = true;
        }
        player.body.velocity.y = -150;
    },
    die: function() {
        window.removeEventListener("deviceorientation", this.handleOrientation, false);
        if (score > highscore) {
            localStorage.setItem('highScore', score);
        }
        if (lookDirection === 'L') {
            player.animations.play('diedL', 8, false)
            console.log("Player died watching left");
            player.events.onAnimationComplete.add(function(){
                console.log("Die animation completed");
                hasDied = false;
                game.state.start("menu");
                health = 3;
                score = 0;
            }, animDieL);
        }
        else
        {
            player.animations.play('diedR', 8, false);
            console.log("Player died watching right");
            player.events.onAnimationComplete.add(function(){
                console.log("Die animation completed");
                hasDied = false;
                game.state.start("menu");
                health = 3;
                score = 0;
            }, animDieR);
        }
    }
};
