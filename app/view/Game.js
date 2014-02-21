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
                    align: 'middle'
                },
                items: [
                    {
                        height: 30,
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
                        height : 30,
                        html: '<h2>Your cards:</h2>'
                    },
                    {
                        flex: 1,
                        html: '<h2>PLAYER CARDS HERE</h2>'
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
                    { xtype : 'spacer' },
                    {
                        itemId: 'status',
                        xtype : 'container',
                        html: '<h2>Starting game...</h2>'
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
                        width: 110,
                        cls: 'score',
                        tpl: new Ext.XTemplate('<h3>Score:</h3><h1>{balance}</h1>'),
                        data: { balance: '16' }
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
                                html: 'Deal'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
