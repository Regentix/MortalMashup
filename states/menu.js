var background, playButton, scoreText, highscore;
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

        
        highscore = localStorage.getItem('highScore');
        localStorage.setItem('highscore', highscore);
        scoreText = game.add.bitmapText(10, 10, 'carrier_command', "Highscore:" + highscore, 15);
        scoreText.tint = 0x0000;
        scoreText.anchor.setTo(0, 0);
    },
    start: function() {
        game.state.start('start');
    }
};