class Player {
  _name = '';
  _cards = [];
  constructor(name) {
    this._name = name;
  }
  set cards(cards) {
    this._cards = cards;
  }
  get cards() {
    return this._cards;
  }
}

module.exports = {
  Player,
};
