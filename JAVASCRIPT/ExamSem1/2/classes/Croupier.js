const Hand = require('pokersolver').Hand;

class Croupier {
  _croupierDeck = [];
  constructor() {}
  shufflingCards() {
    //  shuffle algo Fischer-Yatesa
    for (let i = this._croupierDeck.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this._croupierDeck[i], this._croupierDeck[randomIndex]] = [
        this._croupierDeck[randomIndex],
        this._croupierDeck[i],
      ];
    }
  }
  get croupierDeck() {
    return this._croupierDeck;
  }
  set croupierDeck(deck) {
    this._croupierDeck = deck;
  }
  dealFiveCards() {
    const croupierDeckTemp = [...this.croupierDeck];
    const givenCards = croupierDeckTemp.splice(0, 5);
    this.croupierDeck = croupierDeckTemp;
    return givenCards;
  }
  checkHand(playersHands) {
    let roundResults = [];
    playersHands.forEach((playerHand, index) => {
      const hand = Hand.solve(playerHand);
      hand.winnerName = `Player_${index + 1}`;
      roundResults.push(hand);
    });
    const winner = Hand.winners(roundResults);
    return { winner };
  }
}

module.exports = {
  Croupier,
};
