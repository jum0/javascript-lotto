import {
  ELEMENT,
  MATCHING_NUMBER,
  RANK,
  WINNING_PRIZE,
} from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

class WinningResult {
  constructor() {
    this.winningNumbers = [];
    this.bonusNumber = 0;
    this.ranks = [];
    this.matchingCounts = [];
  }

  setWinningNumbers(winningNumbers) {
    this.winningNumbers = winningNumbers.map((number) => Number(number));
  }

  setBonusNumber(bonusNumber) {
    this.bonusNumber = Number(bonusNumber);
  }

  setRanks(ticketBundle) {
    this.ranks = ticketBundle.map((ticket) => {
      const matchingCount = ticket.filter((number) =>
        this.winningNumbers.includes(number)
      ).length;

      return this.decideRank(matchingCount, ticket);
    });
  }

  decideRank(matchingCount, ticket) {
    switch (matchingCount) {
      case MATCHING_NUMBER.SIX:
        return RANK.FIRST;
      case MATCHING_NUMBER.FIVE:
        return ticket.includes(this.bonusNumber) ? RANK.SECOND : RANK.THIRD;
      case MATCHING_NUMBER.FOUR:
        return RANK.FOURTH;
      case MATCHING_NUMBER.THREE:
        return RANK.FIFTH;
      default:
        return RANK.LOSER;
    }
  }

  setMatchingCounts() {
    const rankInfo = [
      [RANK.FIRST, WINNING_PRIZE.FIRST],
      [RANK.SECOND, WINNING_PRIZE.SECOND],
      [RANK.THIRD, WINNING_PRIZE.THIRD],
      [RANK.FOURTH, WINNING_PRIZE.FOURTH],
      [RANK.FIFTH, WINNING_PRIZE.FIFTH],
    ];
    let tmpMatchingCounts = [];
    let totalPrize = 0;

    rankInfo.forEach((rankArray, i) => {
      const matchingCount = this.ranks.filter((rank) => rank === rankArray[0])
        .length;

      tmpMatchingCounts.push(matchingCount);
      totalPrize += this.calculatePrize(rankInfo, i, matchingCount);
    });

    this.matchingCounts = tmpMatchingCounts;
    $(ELEMENT.WIN_NUMBER_CONTAINER).dataset.totalPrize = totalPrize;
  }

  calculatePrize(rankInfo, i, matchingCount) {
    return matchingCount * rankInfo[i][1];
  }
}

export default new WinningResult();
