Ext.define('DoubleUp.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            startGameButton: '#startGameButton'
        },
        control: {
            startGameButton: {
                tap: 'startNewGame'
            }
        },
        views: [
            'Main',
            'Game'
        ]
    },

    startNewGame: function() {
        // Call the server to start a new game

        alert('start game');
        Ext.Viewport.setActiveItem({ xtype: 'GameView' }, this.slideLeftTransition);
    }
});