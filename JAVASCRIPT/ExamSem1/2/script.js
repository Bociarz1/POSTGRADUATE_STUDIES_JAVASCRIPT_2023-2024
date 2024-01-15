// 5.	EXAM Create a solution that will tell us what poker set we have. 
// The solution is to deal us 5 cards from the standard 52 card deck at random. 
// Based on cards on our hand the program should tell us what is the best poker set. 
// Reference: https://pl.wikipedia.org/wiki/Poker#Starsze%C5%84stwo_uk%C5%82ad%C3%B3w_kart

const { CONFIG } = require('./config');
const { Deck } = require('./classes/Deck');
const { Croupier } = require('./classes/Croupier');
const { Player } = require('./classes/Player');

function gameInit() {
  const deck = new Deck();
  const croupier = new Croupier();
  return { deck, croupier };
}

function createPlayers(amountOfPlayers) {
  let players = [];
  for (let i = 0; i <= amountOfPlayers - 1; i++) {
    const player = new Player(`Player_${i + 1}`);
    players.push(player);
  }
  return players;
}

function consoleResults(winner, round) {
  console.log('******************');
  console.log('------------------');
  console.log(`R O U N D _ ${round}`);
  console.log('------------------');
  console.log(`W I N ${winner.winnerName}`);
  console.log(`BY _  ${winner.name}`);
  console.log(`W I TH _ H A N D :`);
  console.log(`${winner.cards}`);
  console.log('------------------');
  console.log('******************');
}

function gameStart(rounds, playersAmount) {
  const { deck, croupier } = gameInit();
  const players = createPlayers(playersAmount);
  croupier.croupierDeck = deck['deck'];

  for (let i = 0; i <= rounds - 1; i++) {
    croupier.shufflingCards();

    players.forEach((player) => {
      const givenCards = croupier.dealFiveCards();
      player.cards = givenCards;
    });

    const { winner } = croupier.checkHand(
      players.map((player) => player.cards)
    );
    consoleResults(winner[0], i + 1);

    players.forEach((player) => {
      croupier.croupierDeck = [...croupier.croupierDeck, ...player.cards];
      player.cards = [];
    });
  }
}

gameStart(CONFIG.rounds, CONFIG.players);
