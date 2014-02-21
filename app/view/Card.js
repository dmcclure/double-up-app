Ext.define('DoubleUp.view.Card', {
    extend: 'Ext.Container',
    xtype: 'card',

    config: {
        cmpCls: 'card',
//        data: {
//            face: 'AS'
//        },
//        cls: 'AS',
        html: [
            '<div class="card-container">',
                '<div class="card-flipper">',
                    '<div class="card-front"></div>',
                    '<div class="card-back"></div>',
                '</div>',
            '</div>'
        ].join('')
    }

    /**
     * Sets the card face to display
     * @param face The card face as a string, such as "6D", QH", etc. Leave blank to show the back of a card
     */
//    setFace: function(face) {
//        x;
//    }
});