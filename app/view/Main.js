Ext.define('DoubleUp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'MainView',
    config: {
		cls: 'main',
		itemId: 'mainView',
		layout : {
			type: 'vbox',
			align: 'stretch'
		},
        items: [
            {
                flex: 1,
                html: [
                    "<h1>Double Up</h1>"
                ].join("")
            },
            {
                xtype: 'button',
                height: 150,
                width: 300,
                id: 'startGameButton',
                //cls: 'double_up_button',
                html: '<h2>Start Game</h2>'
            }
        ]
    }
});
