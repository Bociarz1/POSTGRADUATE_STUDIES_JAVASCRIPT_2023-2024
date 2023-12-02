// trefl (♣, popularnie: żołądź, ang. : Clubs) c
// karo (♦, popularnie: dzwonek, ang.: Diamonds) d
// kier (♥, popularnie: czerwień, ang.: Hearts) h
// pik (♠, popularnie: wino, ang.: Spades) s

function generateDeck() {
  let deck = [];
  const colors = ['c', 'd', 'h', 's'];
  const figures = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ];
  for (let c = 0; c <= colors.length - 1; c++) {
    for (let f = 0; f <= figures.length - 1; f++) {
      deck.push(`${figures[f]}${colors[c]}`);
    }
  }
  return deck;
}

class Deck {
  _deck = [];
  constructor() {
    this.deck = generateDeck();
  }
  get deck() {
    return this._deck;
  }
  set deck(deck) {
    this._deck = deck;
  }
}

module.exports = {
  Deck: Deck,
};
