Ext.define('DoubleUp.view.Card', {
    extend: 'Ext.Container',
    xtype: 'card',
    config: {
        itemId: 'card',
        baseCls: 'card',
        width: 124,  // TODO: Move these to the css file?
        height: 181,
        margin: 10,
        data: {
            face: 'AS'
        },
        cls: 'AS',
        html: '<p>card<br>here</p>'
    }

    /**
     * Sets the card face to display
     * @param face The card face as a string, such as "6D", QH", etc. Leave blank to show the back of a card
     */
//    setFace: function(face) {
//        x;
//    }
});