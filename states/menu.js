var menuState = {
    create: function() {
        console.log("Entering menu");

        var playButton = game.add.sprite(game.world.centerX, game.world.centerY, 'play');
        playButton.anchor.setTo(0.5,0.5);
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(this.start, this);
    },
    start: function() {
        game.state.start('start');
    }
};