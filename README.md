double-up-app
=============

This is a Sencha Touch mobile application that plays a game of Double Up.

The dealer draws a card and the player must select one of three face down cards hoping to beat the dealer.

The application interacts with a REST API to initialize and play the game.

Some key files are:

[controller/Game.js](https://github.com/dmcclure/double-upp-app/app/controller/Game.js)
- This is the primary controller for the game. It controls the game's view and interacts with the REST API.

[view/Game.js](https://github.com/dmcclure/double-upp-app/app/view/Game.js)
- This is the primary view for the game. It describes the appearance of the main game screen.

[view/Card.js](https://github.com/dmcclure/double-upp-app/app/view/Card.js)
- This component is reused to display each of the dealer and player cards.

[resources/sass/app.scss](https://github.com/dmcclure/double-upp-app/app/resources/sass/app.scss)
- This SASS file contains the CSS styles and overrides for the application.
