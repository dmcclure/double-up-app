# This script generates CSS classes for the card face sprites stored in /resources/images/cards.png

suits = ['H', 'D', 'C', 'S']
ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

for s in range(len(suits)):
    for r in range(len(ranks)):
        x = r * 124 + r  # Calculate the card's x-coordinate
        y = s * 180 + s  # Calculate the card's y-coordinate
        print '.card-face-%s%s {background-position: -%dpx -%dpx}' % (ranks[r], suits[s], x, y)