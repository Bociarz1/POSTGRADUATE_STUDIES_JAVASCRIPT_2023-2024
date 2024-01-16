const { PokerSolveHelper } = require('./PokerSolveHelper');

const POKER_LAYOUTS = {
  ROYAL_FLUSH: 'Royal flush',
  STRAIGTH_FLUSH: 'Straigth flush',
  FOUR_OF_A_KIND: 'Four of a kind',
  FULL_HOUSE: 'Full house',
  FLUSH: 'Flush',
  STRAIGHT: 'Straight',
  THREE_OF_A_KIND: 'Three of a kind',
  TWO_PAIR: 'Two pair',
  ONE_PAIR: 'One pair',
  HIGH_CARD: 'High card',
};

class PokerCardLayouts {
  #hand;
  constructor(hand) {
    this.#hand = hand;
  }
  get hand() {
    return this.#hand;
  }
  set hand(value) {
    this.#hand = value;
  }
  // solve pocker hand
  solve() {
    let handLayout;
    this.prepareToSolve();

    // High card
    const highCard = this.handIsHighCard();
    handLayout = highCard.result ? highCard.layoutRank : handLayout;

    // One pair
    const onePair = this.handIsOnePair();
    handLayout = onePair.result ? onePair.layoutRank : handLayout;

    // Two pair
    const twoPair = this.handIsTwoPair();
    handLayout = twoPair.result ? twoPair.layoutRank : handLayout;

    // Three of a kind
    const threeOfAKind = this.handIsThreeOfAKind();
    handLayout = threeOfAKind.result ? threeOfAKind.layoutRank : handLayout;

    // Straight
    const straight = this.handIsStraight();
    handLayout = straight.result ? straight.layoutRank : handLayout;

    // Flush
    const flush = this.handIsFlush();
    handLayout = flush.result ? flush.layoutRank : handLayout;

    // Full house
    const fullHouse = this.handIsFullHouse();
    handLayout = fullHouse.result ? fullHouse.layoutRank : handLayout;

    // Four of a kind
    const fourOfAKind = this.handIsFourOfAKind();
    handLayout = fourOfAKind.result ? fourOfAKind.layoutRank : handLayout;

    // Straigth flush
    const straigthFlush = this.handIsStraigthFlush();
    handLayout = straigthFlush.result ? straigthFlush.layoutRank : handLayout;

    // Royal flush
    const royalFlush = this.handIsRoyalFlush();
    handLayout = royalFlush.result ? royalFlush.layoutRank : handLayout;
    console.log('CARDS: ', this.hand);
    return handLayout;
  }
  prepareToSolve() {
    this.hand = PokerSolveHelper.divideFiguresAndColor(this.hand);
    this.hand = PokerSolveHelper.sortByFigures(this.hand);
  }
  handIsHighCard() {
    return {
      result: true,
      layoutRank: POKER_LAYOUTS.HIGH_CARD,
    };
  }
  handIsOnePair() {
    return {
      result: PokerSolveHelper.areSameFigures(this.hand, 2).result,
      layoutRank: POKER_LAYOUTS.ONE_PAIR,
    };
  }
  handIsTwoPair() {
    const failResult = {
      result: false,
      layoutRank: POKER_LAYOUTS.TWO_PAIR,
    };
    const { result, figure } = PokerSolveHelper.areSameFigures(this.hand, 2);
    if (!result) return failResult;
    const secondPairFigure = PokerSolveHelper.areSameFigures(
      this.hand,
      2,
      figure
    );
    if (!secondPairFigure.result) return failResult;
    else
      return {
        result: true,
        layoutRank: POKER_LAYOUTS.TWO_PAIR,
      };
  }
  handIsThreeOfAKind() {
    return {
      result: PokerSolveHelper.areSameFigures(this.hand, 3).result,
      layoutRank: POKER_LAYOUTS.THREE_OF_A_KIND,
    };
  }
  handIsStraight() {
    const failResult = {
      result: false,
      layoutRank: POKER_LAYOUTS.STRAIGHT,
    };
    const successResult = {
      result: true,
      layoutRank: POKER_LAYOUTS.STRAIGHT,
    };
    const { streakLength, minRank, maxRank } =
      PokerSolveHelper.isInfiguresStreak(this.hand);

    if (
      streakLength === 4 &&
      minRank === 0 &&
      PokerSolveHelper.cardExistInHand(this.hand, 'A')
    ) {
      return successResult;
    }
    if (streakLength !== 5) return failResult;
    PokerSolveHelper.isInfiguresStreak(this.hand);
    if (
      !PokerSolveHelper.isOneCardInOtherColor(this.hand, this.hand[0].color)
    ) {
      return failResult;
    }
    return successResult;
  }
  handIsFlush() {
    const fiveCardsInOneColor = PokerSolveHelper.isInOneColor(
      this.hand,
      5
    ).result;
    const { streakLength } = PokerSolveHelper.isInfiguresStreak(this.hand);
    const isNotRoyalFlush = streakLength !== 5;
    if (isNotRoyalFlush && fiveCardsInOneColor) {
      return {
        result: true,
        layoutRank: POKER_LAYOUTS.FLUSH,
      };
    } else {
      return {
        result: false,
        layoutRank: POKER_LAYOUTS.FLUSH,
      };
    }
  }
  handIsFullHouse() {
    const failResult = {
      result: false,
      layoutRank: POKER_LAYOUTS.FULL_HOUSE,
    };
    const { result, figure } = PokerSolveHelper.areSameFigures(this.hand, 3);
    if (!result) return failResult;
    const secondPairFigure = PokerSolveHelper.areSameFigures(
      this.hand,
      2,
      figure
    );
    if (!secondPairFigure.result) return failResult;
    else
      return {
        result: true,
        layoutRank: POKER_LAYOUTS.FULL_HOUSE,
      };
  }
  handIsFourOfAKind() {
    return {
      result: PokerSolveHelper.areSameFigures(this.hand, 4).result,
      layoutRank: POKER_LAYOUTS.FOUR_OF_A_KIND,
    };
  }
  handIsStraigthFlush() {
    const fiveCardsInOneColor = PokerSolveHelper.isInOneColor(
      this.hand,
      5
    ).result;
    const { streakLength, minRank, maxRank } =
      PokerSolveHelper.isInfiguresStreak(this.hand);
    if (
      fiveCardsInOneColor &&
      minRank !== 8 &&
      maxRank !== 12 &&
      streakLength === 5
    ) {
      return {
        result: true,
        layoutRank: POKER_LAYOUTS.STRAIGTH_FLUSH,
      };
    } else {
      return {
        result: false,
        layoutRank: POKER_LAYOUTS.STRAIGTH_FLUSH,
      };
    }
  }
  handIsRoyalFlush() {
    const fiveCardsInOneColor = PokerSolveHelper.isInOneColor(
      this.hand,
      5
    ).result;
    const { streakLength, minRank, maxRank } =
      PokerSolveHelper.isInfiguresStreak(this.hand);
    if (
      fiveCardsInOneColor &&
      minRank === 8 &&
      maxRank === 12 &&
      streakLength === 5
    ) {
      return {
        result: true,
        layoutRank: POKER_LAYOUTS.ROYAL_FLUSH,
      };
    } else {
      return {
        result: false,
        layoutRank: POKER_LAYOUTS.ROYAL_FLUSH,
      };
    }
  }
}

module.exports = {
  PokerCardLayouts,
};
