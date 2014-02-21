Ext.define('DoubleUp.view.Card', {
    extend: 'Ext.Component',
    xtype: 'card',

    config: {
        cmpCls: 'card',
        face: null,

        html: [
            '<div class="card-container">',
                '<div class="card-flipper">',
                    '<div class="card-front"></div>',
                    '<div class="card-back"></div>',
                '</div>',
            '</div>'
        ].join(''),

        listeners: {
            tap: {
                fn: function() {
                    this.fireEvent('tap', this);
                },
                element: 'element'
            }
        }
    },

    /**
     * Sets the card face to display
     * @param face The card face as a string, such as "6D", QH", etc. Leave blank to show the back of a card
     */
    setFace: function(face) {
        if (this.face) {
            // Remove the old face class
            this.element.down('div.card-front').removeCls('card-face-' + this.face);
        }
        this.element.down('div.card-front').addCls('card-face-' + face);
        this.face = 'card-face-' + face;
    },

    flip: function() {
        this.element.down('div.card-flipper').addCls('card-rotate');
    },

    reset: function() {
        this.element.down('div.card-flipper').removeCls('card-rotate');
        // Remove the old face class
        this.element.down('div.card-front').removeCls('card-face-' + this.face);
        this.face = null;
    }
});