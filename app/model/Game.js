Ext.define('DoubleUp.model.Game', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'id', type: 'string' },
            { name: 'dealerCard', type: 'string' },
            { name: 'balance', type: 'int' },
            { name: 'roundInProgress', type: 'boolean' },
            { name: 'playerCardSelected', type: 'int' },
            { name: 'playerCards', type: 'auto' },
        ]
    }
});