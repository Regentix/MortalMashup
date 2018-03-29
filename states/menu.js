var background, playButton, scoreText, highscore = 0, gameName, music, gameScore;
var menuState = {
    create: function() {
        console.log("Entering menu");

        background = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'menu-background');
        background.anchor.setTo(0.5);

        var backgroundRatio;
        if(window.innerHeight > window.innerWidth) {
            backgroundRatio = window.innerHeight/1920;
        }
        else {
            backgroundRatio = window.innerWidth/1920;
        }
        background.scale.setTo(backgroundRatio,backgroundRatio);
        background.fixedToCamera = true;

        playButton = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'play');
        playButton.anchor.setTo(0.5,0.5);
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(this.start, this);

        gameScore = localStorage.getItem('gameScore');
        if (localStorage.getItem('gameScore') > 0) {
            localStorage.setItem('gameScore', 0);
            scoreText = game.add.bitmapText(window.innerWidth / 2, 25, 'carrier_command', "your score:" + gameScore, 15);
            scoreText.tint = 0xffffff;
            scoreText.anchor.setTo(0.5, 0.5);
        }
        
        highscore = localStorage.getItem('highScore');
        localStorage.setItem('highscore', highscore);
        scoreText = game.add.bitmapText(window.innerWidth / 2, (window.innerHeight / 2)+100, 'carrier_command', "Highscore:" + highscore, 15);
        scoreText.tint = 0xffffff;
        scoreText.anchor.setTo(0.5, 0.5);

        gameName = game.add.bitmapText(window.innerWidth / 2, (window.innerHeight / 2)-125, 'carrier_command', "Mortal Mashup", 30);
        gameName.tint = 0xffffff;
        gameName.anchor.setTo(0.5, 0.5);
    },
    start: function() {
        speed = -150;
        maxBills = 5;
        maxGhosts = 5;
        distance = 1.00;
        currentWave = 1;
        isDying = false;
        invincible = false;
        health = 3;
        score = 0;
        if (isMusicPlaying) {
            music.stop();
            music.destroy();
            isMusicPlaying = false;
        }
        music = game.add.audio('music');
        game.state.start('start');
    }
};