class PokerSolveHelper {
  constructor() {}

  // convert hand, example: from '7s' to { figure: '7', color: 's', rank: 5 }
  static divideFiguresAndColor(hand) {
    return hand.map((card) => {
      let figure;
      let color;
      // exception for figure: 10
      if (card.length === 3) {
        figure = '10';
        color = card[2];
      } else {
        figure = card[0];
        color = card[1];
      }
      return { figure, color, rank: this.setRank(figure) };
    });
  }
  // figure as: '2','3','4','5','6','7','8','9','10','J','Q','K','A',
  // to get ranks from 0 to 12
  static setRank(figure) {
    let rank;
    switch (figure) {
      case 'J':
        rank = 11;
        break;
      case 'Q':
        rank = 12;
        break;
      case 'K':
        rank = 13;
        break;
      case 'A':
        rank = 14;
        break;
      default:
        rank = figure;
    }
    return rank - 2;
  }

  static sortByFigures(hand) {
    return hand.sort((a, b) => a.rank - b.rank);
  }
  // check amount of cards in one color
  static isInOneColor(hand, amount) {
    let isInOneColor = {
      result: false,
      color: '',
    };
    const sortedCardsByColors = hand.reduce(
      (acc, curr) => {
        acc[curr.color].push(curr);
        return acc;
      },
      { c: [], d: [], h: [], s: [] }
    );
    for (const color in sortedCardsByColors) {
      if (sortedCardsByColors[color].length >= amount) {
        isInOneColor = {
          result: true,
          color,
        };
        break;
      }
    }
    return isInOneColor;
  }
  // check for cards in other colors
  static isOneCardInOtherColor(hand, excludeColor) {
    return (
      hand
        .map((card) => card.color)
        .filter((cardColor) => cardColor !== excludeColor).length > 0
    );
  }
  // find greatest figure
  static findGreatestFigure(hand) {
    return hand.sort((a, b) => b.rank - a.rank)[0];
  }
  // check for max figures streak
  static isInfiguresStreak(hand) {
    hand = this.removeDuplicatesFormHand(hand);
    hand = this.sortByFigures(hand);
    let currentStreak = 1;
    let longestStreak = 1;
    let currentMinValue = hand[0].rank;
    let longestMinValue = hand[0].rank;

    for (let i = 1; i < hand.length; i++) {
      if (hand[i].rank - hand[i - 1].rank === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
        currentMinValue = hand[i].rank;
      }
      if (currentStreak >= longestStreak) {
        longestStreak = currentStreak;
        longestMinValue = currentMinValue;
      }
    }

    return {
      streakLength: longestStreak,
      minRank: longestMinValue,
      maxRank: longestMinValue + longestStreak - 1,
    };
  }
  static removeDuplicatesFormHand(hand) {
    return hand.reduce((acc, curr) => {
      const isDuplication =
        acc.length > 0
          ? acc.map((card) => card.figure).includes(curr.figure)
          : false;
      if (isDuplication) return acc;
      else {
        acc.push(curr);
        return acc;
      }
    }, []);
  }
  static areSameFigures(hand, amount, excludeFigure) {
    let areSameFigures = {
      result: false,
      figure: '',
    };

    if (excludeFigure) {
      hand = hand.filter((card) => card.figure !== excludeFigure);
    }

    const sortedCardsByFigure = hand.reduce(
      (acc, curr) => {
        acc[curr.figure].push(curr);
        return acc;
      },
      {
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        J: [],
        Q: [],
        K: [],
        A: [],
      }
    );
    for (const figure in sortedCardsByFigure) {
      if (sortedCardsByFigure[figure].length >= amount) {
        areSameFigures = {
          result: true,
          figure,
        };
        break;
      }
    }
    return areSameFigures;
  }
  static cardExistInHand(hand, figure) {
    return hand.map((card) => card.figure).includes(figure);
  }
}

module.exports = {
  PokerSolveHelper,
};
