Ext.define('DoubleUp.controller.Game', {
    extend: 'Ext.app.Controller',

    config: {
        apiUrl: 'http://doubleup.davemac.info/api/v1/game',
        game: null,  // This object stores the current game state

        refs: {
            dealerCard: '#dealerCard',
            dealButton: '#dealButton',
            playerCard0: '#playerCard0',
            playerCard1: '#playerCard1',
            playerCard2: '#playerCard2',
            score: '#score',
            status: '#status'
        },
        control: {
            playerCard0: {
                tap: 'playerCardSelected'
            },
            playerCard1: {
                tap: 'playerCardSelected'
            },
            playerCard2: {
                tap: 'playerCardSelected'
            },
            dealButton: {
                tap: 'startNewRound'
            }
        },
        views: [
            'Game'
        ]
    },

    /**
     * Updates the view based on the contents of the this.game model
     */
    updateGameView: function() {
        var game = this.getGame();
        this.getScore().setData({ score: game.get('balance') });

        if (game.get('roundInProgress')) {
            this.getDealButton().disable();
            this.getDealerCard().setFace(game.get('dealerCard'));
            this.getDealerCard().flip();
            this.getStatus().setData({ status: 'Select a card...' });
        }
        else {  // The user just selected a card
            if (game.get('roundResult') == -1) {
                this.getStatus().setData({ status: 'Sorry, you lose' });
            }
            else if (game.get('roundResult') == 1) {
                this.getStatus().setData({ status: 'You win!' });
            }
            else {
                // It's a push
                this.getStatus().setData({ status: 'Push!' });
            }

            this.getPlayerCard0().setFace(game.get('playerCards')[0]);
            this.getPlayerCard1().setFace(game.get('playerCards')[1]);
            this.getPlayerCard2().setFace(game.get('playerCards')[2]);

            // Flip the card the user selected
            var remainingCards;
            if (game.get('playerCardSelected') == 0) {
                this.getPlayerCard0().flip();
                remainingCards = [this.getPlayerCard1(), this.getPlayerCard2()];
            }
            else if (game.get('playerCardSelected') == 1) {
                this.getPlayerCard1().flip();
                remainingCards = [this.getPlayerCard0(), this.getPlayerCard2()];
            }
            else if (game.get('playerCardSelected') == 2) {
                this.getPlayerCard2().flip();
                remainingCards = [this.getPlayerCard0(), this.getPlayerCard1()];
            }

            // Create a delayed task to flip the remaining player cards after a short delay
            var dealButton = this.getDealButton();
            var task = Ext.create('Ext.util.DelayedTask', function() {
                    remainingCards[0].flip();
                    remainingCards[1].flip();
                    dealButton.enable();
                 });
            task.delay(1500);
        }

    },

    /**
     * If no game is in progress then a brand new one will be started. If a game is currently in progress then a
     * new game round will be created.
     */
    startNewRound: function() {
        // Disable the Deal button
        this.getDealButton().disable();

        // Reset all the cards
        this.getDealerCard().reset();
        this.getPlayerCard0().reset();
        this.getPlayerCard1().reset();
        this.getPlayerCard2().reset();

        // We wait a short time so the card reset animations complete
        var me = this;
        var newRoundTask = Ext.create('Ext.util.DelayedTask', function() {
            // If the game is over, start a new one. Otherwise, create a new round
            var url = me.getApiUrl();
            if (me.getGame() && me.getGame().get('balance') > 0) {
                url += '/' + me.getGame().getId() + '/round';
            }

            Ext.Ajax.request({
                url: url,
                method: 'POST',
                callback: function(options, success, response) {
                    if(success) {
                        me.setGame(Ext.create('DoubleUp.model.Game', JSON.parse(response.responseText)));
                        me.updateGameView();
                    } else {
                        Ext.Msg.alert('Oops', 'Something went wrong. Sorry about that');
                        Ext.Viewport.animateActiveItem({ xtype: 'MainView' }, {type:'slide'});
                    }
                }
            });
        });
        newRoundTask.delay(500);
    },

    /**
     * Called when the player selects one of their three cards. The card selected is sent to the server to play
     * the round.
     * @param card The card selected by the player
     */
    playerCardSelected: function(card) {
        // Don't do anything if we're not in a round
        if (!this.getGame().get('roundInProgress')) {
            return;
        }

        // Send the card selected to the server
        var cardSelected = card.getId().slice(-1);

        var me = this;
        Ext.Ajax.request({
            url: this.getApiUrl() + '/' + me.getGame().getId(),
            method: 'PUT',
            params: { cardSelected: cardSelected },
            callback: function(options, success, response) {
                if(success) {
                    me.setGame(Ext.create('DoubleUp.model.Game', JSON.parse(response.responseText)));
                    me.updateGameView();
                } else {
                    Ext.Msg.alert('Oops, something went wrong. Sorry about that');
                    Ext.Viewport.animateActiveItem({ xtype: 'MainView' }, {type:'slide'});
                }
            }
        });
    }
});