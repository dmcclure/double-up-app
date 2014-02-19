Ext.define('DoubleUp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'MainView',
    config: {
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
        items: [
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
                        xtype: 'image',
                        src: 'resources/images/title.png',
                        width: 300,
                        height: 300
                    },
                    { xtype : 'spacer' }
                ]
            },
            {
                xtype: 'container',
                height: 150,
                items: [
                    {
                        xtype: 'button',
                        height: 60,
                        width: 200,
                        id: 'startGameButton',
                        html: '<h2>Start</h2>'
                    }
                ]
            }
        ]
    }
});
