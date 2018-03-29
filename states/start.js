var ghost, rndSpawnDirection, latestHealingTimeStamp, timerHeal, player, stateButton, gyroMovementX, fires, fire, weapon, jumpButton, direction, floor, fpsText,landscape, landscape2, landscape3, landscape4, landscape5, landscape6, platforms, tetris, platform, x, y, rndMap, cursors, floors, lavas, restartButton, saws, saw, bulletBills, scoreText, highscore, hearts,  animDieR, animDieL, timerInvincible, ghosts, ghostNumber;
var score = 0;
var health = 3;
var invincible = false;
var lookDirection = "R";
var ghostSpeed = 50;
var moving = false;
var hasDied = false;
var isHealing = false;
var billHeights = [390,300,220,140,80];
var tetrisIndex = [ "tetris-1", "tetris-2", "tetris-3", "tetris-4", "tetris-5"];
var platformHeights = [0,340,260,180,120];
var spawnHeight = [150, 190, 230, 270, 310, 350, 390];
var ghostColors = ['ghost1', 'ghost2', 'ghost3', 'ghost4'];
var platformMap = {
    0: [0,1,0,2,0,3,0,4,0,3,0,2,0,1,0,1,0,2,0,3,0,4,0,1,0,2,0,3,0,2,0,1,0,2,0,1,0,1,0,3],
    1: [0,4,0,3,0,2,0,1,0,1,0,2,0,1,0,4,0,3,0,2,0,1,0,3,0,4,0,1,0,1,0,2,0,4,0,3,0,2,0,2],
    2: [0,1,0,2,0,3,0,1,0,2,0,3,0,1,0,2,0,3,0,1,0,2,0,3,0,1,0,2,0,3,0,1,0,2,0,3,0,1,0,2],
    3: [0,1,0,2,0,3,0,4,4,0,3,0,4,0,3,0,2,2,0,1,0,3,0,1,0,2,0,3,0,1,0,2,0,3,0,2,0,0,3,3]    //Vincent
};
var floorMap = {
    0: [1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1],
    1: [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
    2: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    3: [1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1]    //Vincent
};
var sawMap = {
    0: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    3: [0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,2,0,0,2,0,0,0,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0]    //Vincent
};
var fireMap = {
    0: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    3: [0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0]    //Vincent
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

        landscape2 = game.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, 1920, 1920, 'landscape2');
        landscape3 = game.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, 1920, 1920, 'landscape3');
        landscape4 = game.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, 1920, 1920, 'landscape4');
        landscape5 = game.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, 1920, 1920, 'landscape5');
        landscape6 = game.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, 1920, 1920, 'landscape6');
        landscape2.anchor.setTo(0.5);
        landscape3.anchor.setTo(0.5);
        landscape4.anchor.setTo(0.5);
        landscape5.anchor.setTo(0.5);
        landscape6.anchor.setTo(0.5);

        landscape2.scale.setTo(backgroundRatio,backgroundRatio);
        landscape2.fixedToCamera = true;
        landscape3.scale.setTo(backgroundRatio,backgroundRatio);
        landscape3.fixedToCamera = true;
        landscape4.scale.setTo(backgroundRatio,backgroundRatio);
        landscape4.fixedToCamera = true;
        landscape5.scale.setTo(backgroundRatio,backgroundRatio);
        landscape5.fixedToCamera = true;
        landscape6.scale.setTo(backgroundRatio,backgroundRatio);
        landscape6.fixedToCamera = true;

        game.world.setBounds(0, 0, 4000, 500);

        fpsText = game.add.text(window.innerWidth - 44, 10, game.time.fps, {
            font: "24px Arial",
            fill: "#000"
        });
        fpsText.anchor.setTo(1,0);
        fpsText.fixedToCamera = true;

        saws = this.add.physicsGroup();
        platforms = this.add.physicsGroup();
        floors = this.add.physicsGroup();
        lavas = this.add.physicsGroup();
        fires = this.add.physicsGroup();
        ghosts = this.add.physicsGroup();

        rndMap = game.rnd.integerInRange(0,3);

        console.log("Loading map " + rndMap);

        for (var n = 0, nlen = 40; n < nlen; n++) {
            if (fireMap[rndMap][n] > 0) {
                x = 100 * n;
                y = platformHeights[fireMap[rndMap][n]];
                fire = fires.create(x, y, 'campfire');
                fire.animations.add('fire', [0,1,2,3], 10, true);
                fire.animations.play('fire', 15, true);
                fire.scale.setTo(2);
                fire.anchor.setTo(1,1);
            }
        }
        for (var m = 0, mlen = 40; m < mlen; m++) {
            if (sawMap[rndMap][m] > 0) {
                x = 100 * m;
                y = platformHeights[sawMap[rndMap][m]];
                saw = saws.create(x, y, 'saw');
                saw.body.immovable = true;
                saw.animations.add('saw', [0,1,2], 15, true);
                saw.animations.play('saw', 15, true);
                saw.anchor.setTo(1.75,0.5);
            }
        }
        for (var i = 0, ilen = 40; i < ilen; i++) {
            if (platformMap[rndMap][i] > 0) {
                x = 100 * i;
                y = platformHeights[platformMap[rndMap][i]];
                platform = platforms.create( x , y, 'platform');
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

        player = game.add.sprite(2000,game.world.height - 130,"player");
        player.anchor.setTo(0.5);
        game.physics.arcade.enable(player);
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true;
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

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

        timerInvincible = game.time.create();

        var maxBills = 5;
        var prevValue = 0;
        bulletBills = this.add.physicsGroup();
        game.physics.arcade.enable(bulletBills);


        for (var k = 1; k < maxBills; k++) {
            var value = game.rnd.integerInRange(0,4);
            while (prevValue === value) {
                value = game.rnd.integerInRange(0,4);
            }

            var bulletBill = bulletBills.create(game.world.width, billHeights[value] , 'bill');
            bulletBill.body.velocity.x = game.rnd.integerInRange(-150, -300);
            bulletBill.checkWorldBounds = true;
            bulletBill.events.onOutOfBounds.add(removeSprite, this);
            prevValue = value;
        }

        function removeSprite(sprite) {
            sprite.kill();
        }

        //tetris
        game.time.events.loop(Phaser.Timer.SECOND * 2, spawn, this);   
        function spawn() {
            if (standing === true || moving === false) {
                tetris = game.add.sprite(player.position.x, 0 , tetrisIndex[game.rnd.integerInRange(0,4)]);
                game.physics.arcade.enable(tetris);
                tetris.checkWorldBounds = true;
                tetris.events.onOutOfBounds.add(removeSprite, this);
                tetris.anchor.setTo(0.5,0.5);
                tetris.scale.setTo(2);
                tetris.body.gravity.y = 400;
            }
        }

        cursors = game.input.keyboard.createCursorKeys();
        window.addEventListener("deviceorientation", this.handleOrientation, false);

    },
    update: function() {
        fpsText.setText(game.time.fps);

        game.physics.arcade.collide(player, platforms, null, null, this);
        game.physics.arcade.collide(player, floors, null, null, this);
        game.physics.arcade.collide(ghosts, ghosts, null, null, this);
        game.physics.arcade.collide(player, lavas, this.lavaHit, null, this);
        game.physics.arcade.collide(player, saws, this.takeHit, null, this);
        game.physics.arcade.overlap(player, bulletBills, this.takeHit, null, this);
        game.physics.arcade.overlap(player, tetris, this.takeHit, null, this);
        game.physics.arcade.overlap(player, ghosts, this.takeHit, null, this);
        game.physics.arcade.overlap(player, fires, this.healFromFire, null, this);

        this.spawnGhost(1);
        ghosts.forEach(this.followPlayer);

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

            if (!game.camera.atLimit.x) {
                landscape2.tilePosition.x += 0.05;
                landscape3.tilePosition.x += 0.35;
                landscape4.tilePosition.x += 0.65;
                landscape5.tilePosition.x += 0.95;
                landscape6.tilePosition.x += 1.25;
            }

            player.animations.play('walkL', true);
            lookDirection = 'L';
            standing = false;
        }
        if (cursors.right.isDown)
        {
            player.body.position.x += 7;

            if (!game.camera.atLimit.x) {
                landscape2.tilePosition.x -= 0.05;
                landscape3.tilePosition.x -= 0.35;
                landscape4.tilePosition.x -= 0.65;
                landscape5.tilePosition.x -= 0.95;
                landscape6.tilePosition.x -= 1.25;
            }

            player.animations.play('walkR', true);
            lookDirection = 'R';
            standing = false;
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -320;
            standing = false;
        }
        if (!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown) {
              standing = true;
        }
    },
    jump: function() {
        if (player.body.touching.down) {
            player.body.velocity.y = -320;

            //score += 10;
            //scoreText.setText('Score:' + score);
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
                
                if (!game.camera.atLimit.x) {
                    landscape2.tilePosition.x -= 0.05;
                    landscape3.tilePosition.x -= 0.35;
                    landscape4.tilePosition.x -= 0.65;
                    landscape5.tilePosition.x -= 0.95;
                    landscape6.tilePosition.x -= 1.25;
                }

                player.animations.play('walkR', 10, true);
                lookDirection = 'R';
            }
            else {
                player.body.velocity.x = -250;

                if (!game.camera.atLimit.x) {
                    landscape2.tilePosition.x += 0.05;
                    landscape3.tilePosition.x += 0.35;
                    landscape4.tilePosition.x += 0.65;
                    landscape5.tilePosition.x += 0.95;
                    landscape6.tilePosition.x += 1.25;
                }

                player.animations.play('walkL', 10, true);
                lookDirection = 'L';
            }
        }
        if (moving === false) {
            player.body.velocity.x = 0;
        }
    },
    takeHit: function() {
        if (!invincible) {
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
            invincible = true;
            timerInvincible.destroy();
            timerInvincible = game.time.create();
            timerEvent = timerInvincible.add(Phaser.Timer.SECOND * 2, this.endInvincible, this);
            player.tint = 0xff8484;
            timerInvincible.start();
        }
    },
    lavaHit: function() {
        if (!invincible) {
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
            invincible = true;
            timerInvincible.destroy();
            timerInvincible = game.time.create();
            timerEvent = timerInvincible.add(Phaser.Timer.SECOND * 2, this.endInvincible, this);
            player.tint = 0xff8484;
            timerInvincible.start();
        }
    },
    die: function() {
        window.removeEventListener("deviceorientation", this.handleOrientation, false);
        invincible = false;
        jumpButton.destroy();
        if (score > highscore) {
            localStorage.setItem('highScore', score);
        }
        if (lookDirection === 'L') {
            player.animations.play('diedL', 8, false);
            player.events.onAnimationComplete.add(function(){
                hasDied = false;
                game.state.start("menu");
                health = 3;
                score = 0;
            }, animDieL);
        }
        else
        {
            player.animations.play('diedR', 8, false);
            player.events.onAnimationComplete.add(function(){
                hasDied = false;
                game.state.start("menu");
                health = 3;
                score = 0;
            }, animDieR);
        }
    },
    endInvincible: function() {
        invincible = false;
        player.tint = 0xffffff;
    },
    healFromFire: function() {
        latestHealingTimeStamp = game.time.now;
        if (!isHealing) {
            isHealing = true;
            timerHeal = game.time.create();
            timerHeal.add(Phaser.Timer.SECOND * 2, this.healPlayer, this);
            timerHeal.start();
        }
    },
    healPlayer: function() {
        isHealing = false;
        if (game.time.now - latestHealingTimeStamp <= Math.ceil(game.time.physicsElapsed * 1000)) {
            if(health < 3) {
                console.log("Healing player");
                if (!hasDied) {
                    health++;
                }
                if (health === 2) {
                    hearts.loadTexture('heart2', 0);
                }
                if (health === 3) {
                    hearts.loadTexture('heart3', 0);
                }
            }
        }

    },
        spawnGhost: function() {
    game.rnd.integerInRange(0,3);

        if (game.camera.position.x+(game.camera.width/2) < (game.camera.width/4)*3) {
                for (var g = 0, glen = ghostNumber; g < glen; g++) {
                    if (ghosts.countLiving() < 15) {
                        x = (game.camera.position.x+game.camera.width+game.rnd.integerInRange(0,1500));
                        y = spawnHeight[game.rnd.integerInRange(0, 6)];
                        ghost = ghosts.create(x, y, ghostColors[game.rnd.integerInRange(0,3)]);
                        ghost.body.bounce.x = 0.5;
                        ghost.anchor.setTo(0,0);
                    }
                 }
        }
        else if (game.camera.position.x+(game.camera.width/4)*3 > game.world.width-(game.camera.width/2)) {
            for (var g = 0, glen = ghostNumber; g < glen; g++) {
                if (ghosts.countLiving() < 15) {
                    x =(game.camera.position.x-game.rnd.integerInRange(0,1500));
                    y = spawnHeight[game.rnd.integerInRange(0, 6)];
                    ghost = ghosts.create(x, y, ghostColors[game.rnd.integerInRange(0,3)]);
                    ghost.body.bounce.x = 0.5;
                    ghost.anchor.setTo(1,1);
                }
             }
        }
        else {
            for (var g = 0, glen = ghostNumber; g < glen; g++) {
                if (ghosts.countLiving() < 15) {
                    rndSpawnDirection = game.rnd.integerInRange(0,1);
                    switch (rndSpawnDirection) {
                        case 0:
                            x = (game.camera.position.x+game.camera.width+game.rnd.integerInRange(0,1500));
                            y = spawnHeight[game.rnd.integerInRange(0, 6)];
                            ghost = ghosts.create(x, y, ghostColors[game.rnd.integerInRange(0,3)]);
                            ghost.body.bounce.x = 0.5;
                            ghost.anchor.setTo(0,0);
                            break;
                        case 1:
                            x = (game.camera.position.x-game.rnd.integerInRange(0,1500));
                            y = spawnHeight[game.rnd.integerInRange(0, 6)];
                            ghost = ghosts.create(x, y, ghostColors[game.rnd.integerInRange(0,3)]);
                            ghost.body.bounce.x = 0.5;
                            ghost.anchor.setTo(1,1);
                            break;
                    }
                }
            }
        }
    },
    followPlayer: function(ghost) {
        game.physics.arcade.moveToObject(ghost,player,ghostSpeed);
    }
};
