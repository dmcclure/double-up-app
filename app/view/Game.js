Ext.define('DoubleUp.view.Game', {
    extend: 'Ext.Container',
    xtype: 'GameView',
    config: {
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
        items: [
            // Dealer's card
            {
                xtype: 'container',
                flex: 2,
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'start'
                },
                items: [
                    {
                        height : 20,
                        html: '<h2>Dealer\'s card:</h2>'
                    },
                    {
                        flex: 1,
                        id: 'dealerCard',
                        xtype: 'card'
                    },
                    { xtype : 'spacer' }
                ]
            },

            // Player's cards
            {
                xtype: 'container',
                flex: 2,
                layout: {
                    type: 'vbox',
                    align: 'middle'
                },
                items: [
                    {
                        height : 20,
                        html: '<h2>Your cards:</h2>'
                    },
                    {
                        flex: 1,
                        xtype: 'container',
                        width: '100%',
                        layout: {
                            type: 'hbox',
                            pack: 'center',
                            align: 'middle'
                        },
                        items: [
                            {
                                flex: 1,
                                id: 'playerCard0',
                                xtype: 'card',
                                cls: 'player-card'
                            },
                            {
                                flex: 1,
                                id: 'playerCard1',
                                xtype: 'card',
                                cls: 'player-card'
                            },
                            {
                                flex: 1,
                                id: 'playerCard2',
                                xtype: 'card',
                                cls: 'player-card'
                            }
                        ]
                    },
                    { xtype : 'spacer' }
                ]
            },

            // Status text
            {
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'middle'
                },
                items: [
                    {
                        itemId: 'status',
                        xtype : 'container',
                        tpl: new Ext.Template('<h2>{status}</h2>'),
                        data: { status: 'Starting game...' }
                    },
                    { xtype : 'spacer' }
                ]
            },

            // Score and Deal button
            {
                xtype: 'container',
                height: 70,
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [
                    {
                        width: 130,
                        cls: 'score',
                        id: 'score',
                        tpl: new Ext.Template('<h3>Score:</h3><h1>{score}</h1>'),
                        data: { score: '' }
                    },
                    {
                        flex: 1,
                        xtype: 'container',
                        cls: 'deal-button-container',
                        items: [
                            {
                                xtype: 'button',
                                height: 50,
                                width: 150,
                                id: 'dealButton',
                                html: 'Deal',
                                disabled: true
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
