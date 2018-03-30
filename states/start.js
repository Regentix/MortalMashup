var isSpawning, lastTetrisSpawnTime, timerSpawn, standing, enemyText, enemyLeft, ghost, rndSpawnDirection, latestHealingTimeStamp, timerHeal;
var player, stateButton, gyroMovementX, fires, fire, weapon, jumpButton, direction;
var floor, fpsText,landscape, landscape2, landscape3, landscape4, landscape5, landscape6;
var platforms, tetris, platform, x, y, rndMap, cursors, floors, lavas, restartButton;
var muteButton, saws, saw, bulletBills, scoreText, highscore, hearts,  animDieR, animDieL;
var timerInvincible, ghosts, ghostNumber, jumpSound, dieSound, shotSound, hitSound, playerX, playerY, wave, waveText;
var len = 40;
var score = 0;
var health = 3;
var currentWave = 1;
var speed = -150;
var maxBills = 5;
var maxGhosts = 5;
var enemyHealth = 1;
var ghostSpeed = 50;
var distance = 1.00;
var totalEnemies = 0;
var lookDirection = "R";
var playerSpawnCount = 0;
var moving = false;
var isDying = false;
var hasDied = false;
var cleared = false;
var clearedBills = false;
var isHealing = false;
var invincible = false;
var isMusicPlaying = false;
var billHeights = [390,300,220,140,80];
var platformHeights = [0,340,260,180,120];
var spawnHeight = [150, 190, 230, 270, 310, 350, 390];
var tetrisIndex = [ "tetris-1", "tetris-2", "tetris-3", "tetris-4", "tetris-5"];
var ghostColors = ['ghost1', 'ghost2', 'ghost3', 'ghost4'];
var platformMap = {                        // v
    0: [1,2,3,0,0,3,0,2,1,3,0,2,0,1,0,1,0,0,0,1,1,2,0,1,0,2,0,3,0,2,0,1,0,2,0,1,0,1,0,3],
    1: [0,4,0,3,0,2,0,1,0,1,0,2,0,1,0,4,0,3,0,2,0,1,0,3,0,4,0,1,0,1,0,2,0,4,0,3,0,2,0,2],
    2: [0,1,0,2,0,3,0,4,4,0,3,0,4,0,3,0,2,2,0,1,0,3,0,1,0,2,0,3,0,1,0,2,0,3,0,2,0,0,3,3]    //Vincent
};
var floorMap = {                           // v
    0: [1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1],
    1: [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
    2: [1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,1,1]   //Vincent
};
var sawMap = {
    0: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    2: [0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,2,0,0,2,0,0,0,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0]    //Vincent
};
var fireMap = {
    0: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    2: [0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,0]    //Vincent
};
var spawnMap = {
    0: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
};
var startState = {
    create: function() {
        //music.stop();
        //music.destroy();
        //music = game.add.audio('music');
        music.play();
        music.mute = false;
        isMusicPlaying = true;
        jumpSound = game.add.audio('jumpSound');
        dieSound = game.add.audio('dieSound');
        shotSound = game.add.audio('shotSound');
        hitSound = game.add.audio('hitSound');

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
        enemyLeft = game.add.bitmapText(window.innerWidth /2, 10 , 'carrier_command', 'Enemies left:', 10);
        enemyLeft.tint = 0x804648;
        enemyLeft.anchor.setTo(0.5,0);
        enemyLeft.fixedToCamera = true;
        wave = game.add.bitmapText(10,70 , 'carrier_command', 'Wave:1', 10);
        wave.tint = 0x804648;
        wave.fixedToCamera = true;

        saws = this.add.physicsGroup();
        platforms = this.add.physicsGroup();
        floors = this.add.physicsGroup();
        lavas = this.add.physicsGroup();
        fires = this.add.physicsGroup();
        ghosts = this.add.physicsGroup();
        bulletBills = this.add.physicsGroup();

        rndMap = game.rnd.integerInRange(0,2);
        //rndMap = 0;
        console.log("Loading map " + rndMap);
        for (var i = 0; i < len; i++) {
            if (platformMap[rndMap][i] > 0) {
                x = 100 * i;
                y = platformHeights[platformMap[rndMap][i]];
                platform = platforms.create( x , y, 'platform');
                platform.body.immovable = true;
                platform.anchor.setTo(0,0);
            }
        }
        for (var j = 0; j < len; j++) {
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
        for (var m = 0; m < len; m++) {
            if (sawMap[rndMap][m] > 0) {
                x = 100 * m;
                y = platformHeights[sawMap[rndMap][m]];
                saw = saws.create(x, y, 'saw');
                saw.body.immovable = true;
                saw.animations.add('saw', [0,1,2], 15, true);
                saw.animations.play('saw', 15, true);
                saw.anchor.setTo(-0.75,0.5);
            }
        }
        for (var n = 0; n < len; n++) {
            if (fireMap[rndMap][n] > 0) {
                x = 100 * n;
                y = platformHeights[fireMap[rndMap][n]];
                fire = fires.create(x, y, 'campfire');
                fire.animations.add('fire', [0,1,2,3], 10, true);
                fire.animations.play('fire', 15, true);
                fire.scale.setTo(2);
                fire.anchor.setTo(0,1);
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

        muteButton = game.add.sprite(window.innerWidth - 10, 70, 'unmute');
        muteButton.anchor.setTo(1,0);
        muteButton.inputEnabled = true;
        muteButton.events.onInputDown.add(this.toggleMute, this);
        muteButton.fixedToCamera = true;

        jumpButton = game.add.sprite(window.innerWidth - 10, window.innerHeight - 10, 'jump');
        jumpButton.anchor.setTo(1,1);
        jumpButton.inputEnabled = true;
        jumpButton.events.onInputDown.add(this.jump, this);
        jumpButton.fixedToCamera = true;

        playerX = this.playerX();
        playerY = this.playerY();

        player = game.add.sprite(playerX,playerY,"player");
        player.anchor.setTo(0,1);
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

        this.spawnRndBills();
        this.spawnGhost();

        //tetris
        game.time.events.loop(Phaser.Timer.SECOND * 1, this.checkEnemies, this);
        game.time.events.loop(Phaser.Timer.SECOND * 5, this.checkBills, this);

        cursors = game.input.keyboard.createCursorKeys();
        window.addEventListener("deviceorientation", this.handleOrientation, false);
        invincible = false;

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
        game.physics.arcade.overlap(weapon.bullets, ghosts, this.enemyHit, null, this);

        this.setTetrisSpawn();

        ghosts.forEach(this.followPlayer);

        if (hasDied) {
            if (isDying === false) {
                this.die();
            }
        }
        else {
            if (game.input.pointer1.isDown) {
                if (game.input.x > window.innerWidth / 2 && game.input.x < window.innerWidth - 161) {
                    weapon.fireAngle = 0;
                    weapon.trackSprite(player, 55, -30);
                    player.animations.play('shotR', 20, false);
                    lookDirection = 'R';
                    weapon.fire();
                    shotSound.play();
                } else if (game.input.x > window.innerWidth / 2 && game.input.x > window.innerWidth - 161) {
                    if (game.input.y < window.innerHeight - 85) {
                        weapon.fireAngle = 0;
                        weapon.trackSprite(player, 55, -30);
                        player.animations.play('shotR', 20, false);
                        lookDirection = 'R';
                        weapon.fire();
                        shotSound.play();
                    }
                }
                else {
                    weapon.fireAngle = 180;
                    weapon.trackSprite(player, -15, -30);
                    player.animations.play('shotL', 20, false);
                    lookDirection = 'L';
                    weapon.fire();
                    shotSound.play();
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
    playerX: function () {
        playerSpawnCount = 0;
        for (var p = 0; p < len; p++) {
            if (spawnMap[rndMap][p] > 0 && playerSpawnCount === 0 ) {
                playerSpawnCount++;
                x = 100 * p;
                return x;
            }
        }
    },
    playerY: function () {
        playerSpawnCount = 0;
        for (var p = 0; p < len; p++) {
            if (spawnMap[rndMap][p] > 0 && playerSpawnCount === 0) {
                playerSpawnCount++;
                y = platformHeights[spawnMap[rndMap][p]];
                return y;
            }
        }
    },
    jump: function() {
        if (player.body.touching.down) {
            player.body.velocity.y = -320;
            jumpSound.play();
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
    toggleMute: function() {
        music.mute = !music.mute;
        if (music.mute) {
            //music.mute = false;
            muteButton.loadTexture('mute', 0);
            console.log("Music playing");
        }
        else {
            //music.mute = true;
            muteButton.loadTexture('unmute', 0);
            console.log("Music muted");
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
            hitSound.play();
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
            hitSound.play();
            timerInvincible.start();
        }
    },
    enemyHit: function(bullet, enemy) {
        enemyHealth -= 1;
        score += 10;
        scoreText.setText('Score:' + score);

        if (enemyHealth <= 0) {
            enemy.destroy();
        }
        bullet.kill();
    },
    die: function() {
        console.log("You died");
        isDying = true;
        localStorage.setItem('gameScore', score);
        music.stop();
        dieSound.play();

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
            }, animDieL);
        }
        else
        {
            player.animations.play('diedR', 8, false);
            player.events.onAnimationComplete.add(function(){
                hasDied = false;

                game.state.start("menu");
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
        waveText = game.add.bitmapText(window.innerWidth /2, window.innerWidth / 6  , 'carrier_command', 'Wave:' + currentWave, 20);
        waveText.tint = 000000;
        waveText.anchor.setTo(0.5);
        waveText.fixedToCamera = true;
        game.time.events.add(Phaser.Timer.SECOND * 3, this.removeWaveText, this);

    
            if (game.camera.position.x+(game.camera.width/2) < (game.camera.width/4)*3) {
                    if ( maxGhosts > 50) {maxGhosts = 50;}
                    for (var g = 0, glen = maxGhosts; g < glen; g++) {
                        if (ghosts.countLiving() < 50) {
                            x = (game.camera.position.x+game.camera.width+game.rnd.integerInRange(0,1500));
                            y = spawnHeight[game.rnd.integerInRange(0, 6)];
                            ghost = ghosts.create(x, y, ghostColors[game.rnd.integerInRange(0,3)]);
                            ghost.body.bounce.x = 0.5;
                            ghost.anchor.setTo(0,0);
                        
                     }
                }
            }
            else if (game.camera.position.x+(game.camera.width/4)*3 > game.world.width-(game.camera.width/2)) {
                if ( maxGhosts > 50) {maxGhosts = 50;}
                for (var g = 0, glen = maxGhosts; g < glen; g++) {
                    if (ghosts.countLiving() < 50) {
                        x =(game.camera.position.x-game.rnd.integerInRange(0,1500));
                        y = spawnHeight[game.rnd.integerInRange(0, 6)];
                        ghost = ghosts.create(x, y, ghostColors[game.rnd.integerInRange(0,3)]);
                        ghost.body.bounce.x = 0.5;
                        ghost.anchor.setTo(1,1);
                    }
                 }
            }
            else {
                if ( maxGhosts > 50) {maxGhosts = 50;}
                for (var g = 0, glen = maxGhosts; g < glen; g++) {
                    if (ghosts.countLiving() < 50) {
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
        removeWaveText: function () {
            waveText.destroy();
        },
        followPlayer: function(ghost) {
        game.physics.arcade.moveToObject(ghost,player,ghostSpeed);
        },
        spawnRndBills: function() {
            var prevValue = 0;
            if (maxBills > 20) { maxBills = 20;}
            if ( Math.abs(speed) > 400) { speed = -400;}

         for (var k = 1; k < maxBills; k++) {
            var value = game.rnd.integerInRange(0,4);
            while (prevValue === value) { value = game.rnd.integerInRange(0,4);}

            var bulletBill = bulletBills.create(game.world.width * distance, billHeights[value] , 'bill');
            bulletBill.body.velocity.x = speed;
            bulletBill.checkWorldBounds = true;
            bulletBill.events.onOutOfBounds.add(this.removeSprite, this);
            prevValue = value;
            distance += 0.04;
         }

        },
    removeSprite: function(sprite) {
        if (sprite.position.x < 0) {
            sprite.destroy();
        }

    },   
    removeTetris: function(sprite) {
            sprite.destroy();
        },
    setTetrisSpawn: function() {
        lastTetrisSpawnTime = game.time.now;
        if (!isSpawning) {
            isSpawning= true;
            timerSpawn = game.time.create();
            if (currentWave < 5) {
                timerSpawn.add(Phaser.Timer.SECOND * 5, this.spawnTetris, this);
            }
            else if (currentWave > 5 && currentWave <= 10) {
                timerSpawn.add(Phaser.Timer.SECOND * 4, this.spawnTetris, this);
            }
            else {
                timerSpawn.add(Phaser.Timer.SECOND * 3, this.spawnTetris, this);
            }
            timerSpawn.start();
        }
    },
    spawnTetris: function() {
        if (game.time.now - lastTetrisSpawnTime <= Math.ceil(game.time.physicsElapsed * 1000)) {
            if (standing || !moving || isSpawning) {
                isSpawning = false;
                tetris = game.add.sprite(player.position.x, 0 , tetrisIndex[game.rnd.integerInRange(0,4)]);
                game.physics.arcade.enable(tetris);
                tetris.checkWorldBounds = true;
                tetris.events.onOutOfBounds.add(this.removeTetris, this);
                tetris.anchor.setTo(0.5,0.5);
                tetris.scale.setTo(2);
                tetris.body.gravity.y = 250;
            }
        }
    },
    checkBills: function() {

        if (bulletBills.countLiving() !== 0) {
            clearedBills = false;
        } else {
            clearedBills = true;

        } if (clearedBills) {
            distance = 1.00;
            speed += (-10);
            maxBills++;
            console.log("updated max-bills" + maxBills);
            this.spawnRndBills();
        }
    },
    checkEnemies: function() {

        if (ghosts.countLiving() !== 0) {
            totalEnemies = ghosts.countLiving();
            enemyLeft.setText('Enemies left:' + totalEnemies);
        } else {
            currentWave++;
            totalEnemies = 0;
            enemyLeft.setText('Enemies left:' + totalEnemies);
            wave.setText('Wave:' + currentWave);
            cleared = true; }

        if (totalEnemies == 0 && cleared) {
            var rndValue = game.rnd.integerInRange(0,10);
            if ( rndValue > 2 && rndValue < 8) { maxGhosts++; }
            if ( rndValue > 8) { maxGhosts += 2;}
            this.spawnGhost();
        }

    },
};
