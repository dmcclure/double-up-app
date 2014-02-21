Ext.define('DoubleUp.controller.Game', {
    extend: 'Ext.app.Controller',

    config: {
        apiUrl: 'http://doubleup.localhost/v1/game',
        game: null,  // This object stores the current game state
        flipped: false,

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
//            dealerCard: {
//                tap: 'flipDealerCard'
//            },
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
//            score: {
//                initialize: 'startFirstGame'
//            }
        },
        views: [
            'Game'
        ]
    },

    startFirstGame: function() {
        this.startNewGame();
    },

    /**
     * Called when we want to start a brand new game.
     */
    startNewGame: function() {
        // Fetch a brand new game from the server
        var me = this;
        Ext.Ajax.request({
            url: this.getApiUrl(),
            method: 'POST',
            callback: function(options, success, response) {
                console.log(response.responseText);
                if(success) {
                    me.setGame(Ext.create('DoubleUp.model.Game', JSON.parse(response.responseText)));
                    me.updateGameView();
                } else {
                    Ext.Msg.alert('Oops, something went wrong. Sorry about that');
                }
            }
        });
    },

    updateGameView: function() {
        var game = this.getGame();
        this.getScore().setData({ score: game.get('balance') });

        if (game.get('roundInProgress')) {
            this.getDealButton().hide();
            this.getDealerCard().setFace(game.get('dealerCard'));
            this.getDealerCard().flip();
            this.getStatus().setData({ status: 'Select a card...' });
        }
        else {  // The user just selected a card
            if (game.get('balance') == 0) {
                this.getStatus().setData({ status: 'Sorry, you lose' });

                // TODO: Do something so the user can start a new game

            }
            else {
                this.getStatus().setData({ status: 'You win!' });
            }
            // TODO: Handle a push

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
                    dealButton.show();
                 });
            task.delay(2000);
        }

    },

    startNewRound: function() {
        // Reset all the cards
        this.getDealerCard().reset();
        this.getPlayerCard0().reset();
        this.getPlayerCard1().reset();
        this.getPlayerCard2().reset();

        var me = this;
        Ext.Ajax.request({
            url: this.getApiUrl() + '/' + me.getGame().getId() + '/round',
            method: 'POST',
            callback: function(options, success, response) {
                console.log(response.responseText);
                if(success) {
                    me.setGame(Ext.create('DoubleUp.model.Game', JSON.parse(response.responseText)));
                    me.updateGameView();
                } else {
                    Ext.Msg.alert('Oops, something went wrong. Sorry about that');
                }
            }
        });
    },

    playerCardSelected: function(card) {
        // Don't do anything if we're not in a round
        if (!this.getGame().get('roundInProgress')) {
            return;
        }

        console.log('card');
        console.log(card);

        // Send the card selected to the server
        var cardSelected = card.getId().slice(-1);

        var me = this;
        Ext.Ajax.request({
            url: this.getApiUrl() + '/' + me.getGame().getId(),
            method: 'PUT',
            params: { cardSelected: cardSelected },
            callback: function(options, success, response) {
                console.log('PUT callback');
                console.log(response.responseText);
                if(success) {
                    me.setGame(Ext.create('DoubleUp.model.Game', JSON.parse(response.responseText)));
                    me.updateGameView();
                } else {
                    Ext.Msg.alert('Oops, something went wrong. Sorry about that');
                }
            }
        });
    }
});