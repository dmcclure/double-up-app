// This override lets us use a callback function after a Ext.Viewport.animateActiveItem() animation completes
Ext.override(Ext.Container, {
    animateActiveItem: function(activeItem, animation, callback) {
        var layout = this.getLayout(),
            defaultAnimation;

        if (this.activeItemAnimation) {
            this.activeItemAnimation.destroy();
        }
        this.activeItemAnimation = animation = new Ext.fx.layout.Card(animation);
        if (animation && layout.isCard) {
            animation.setLayout(layout);
            defaultAnimation = layout.getAnimation();
            if (defaultAnimation) {
                defaultAnimation.disable();
                animation.on('animationend', function() {
                    defaultAnimation.enable();
                    animation.destroy();

                    if(callback){
                          callback();
                    }
                }, this);
            }else{
                animation.on('animationend', function() {
                    animation.destroy();
                    if(callback){
                          callback();
                    }
                }, this);
            }
        }
        return this.setActiveItem(activeItem);
    }
});

Ext.define('DoubleUp.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            startGameButton: '#startGameButton'
        },
        control: {
            startGameButton: {
                tap: 'startNewGame'
            }
        },
        views: [
            'Main',
            'Game'
        ]
    },

    startNewGame: function() {
        Ext.Viewport.animateActiveItem({ xtype: 'GameView' }, {type:'slide'}, function() { DoubleUp.app.getController('DoubleUp.controller.Game').startFirstGame(); });
    }
});