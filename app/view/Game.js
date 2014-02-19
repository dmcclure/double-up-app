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
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'middle'
                },
                items: [
                    { xtype : 'spacer' },
                    {
                        xtype : 'container',
                        html: '<h3>dealer card</h3>'
                    },
                    { xtype : 'spacer' }
                ]
            },

            // Player's cards
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
                        xtype : 'container',
                        html: '<h3>player\'s cards</h3>'
                    },
                    { xtype : 'spacer' }
                ]
            },

            // Score and Deal button
            // Player's cards
            {
                xtype: 'container',
                height: 100,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        width: 100,
                        style: 'background: red;',
                        xtype : 'container',
                        html: '<h3>player\'s score</h3>'
                    },
                    {
                        flex: 1,
                        xtype : 'container',
                        html: '<h3>Deal button</h3>'
                    }
                ]
            }
        ]
    }
});
