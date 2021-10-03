export default class Yatzy {
  static chance(dices: Dices): number {
    return dices.sum();
  }

  static yatzy(dices: Dices): number {
    let isYatzy = dices.findGreaterDiceWithNumberOfSameDices(5) !== 0;
    return isYatzy ? 50 : 0;
  }

  static ones(dices: Dices): number {
    return dices.with(1).sum();
  }

  static twos(dices: Dices): number {
    return dices.with(2).sum();
  }

  static threes(dices: Dices): number {
    return dices.with(3).sum();
  }

  static fours(dices: Dices): number {
    return dices.with(4).sum();
  }

  static fives(dices: Dices): number {
    return dices.with(5).sum();
  }

  static sixes(dices: Dices): number {
    return dices.with(6).sum();
  }

  static score_pair(dices: Dices): number {
    return 2 * dices.findGreaterDiceWithNumberOfSameDices(2);
  }

  static two_pair(dices: Dices): number {
    let firstDice = dices.findGreaterDiceWithNumberOfSameDices(2);
    let secondDice = dices.findGreaterDiceWithNumberOfSameDices(2, firstDice);
    let isTwoPair = firstDice && secondDice;
    return isTwoPair ? firstDice * 2 + secondDice * 2 : 0;
  }

  static three_of_a_kind(dices: Dices): number {
    return 3 * dices.findGreaterDiceWithNumberOfSameDices(3);
  }

  static four_of_a_kind(dices: Dices): number {
    return 4 * dices.findGreaterDiceWithNumberOfSameDices(4);
  }

  static smallStraight(dices: Dices): number {
    return dices.equals(new Dices(1, 2, 3, 4, 5)) ? 15 : 0;
  }

  static largeStraight(dices: Dices): number {
    return dices.equals(new Dices(2, 3, 4, 5, 6)) ? 20 : 0;
  }

  static fullHouse(dices: Dices): number {
    let threeOfAKind = dices.findGreaterDiceWithNumberOfSameDices(3);
    let twoOfAKind = dices.findGreaterDiceWithNumberOfSameDices(2, threeOfAKind);
    let isFullHouse = threeOfAKind !== 0 && twoOfAKind !== 0;
    return isFullHouse ? threeOfAKind * 3 + twoOfAKind * 2 : 0;
  }
}

export class Dices {
  private dices: number[];

  constructor(...dices: number[]) {
    this.dices = dices;
  }

  sum(): number {
    return this.dices.reduce((acum, number) => acum + number, 0);
  }

  with(number: number): Dices {
    let dices = this.dices
      .filter(dice => dice === number);
    return new Dices(...dices);
  }

  equals(other: Dices): boolean {
    return JSON.stringify(this.dices.sort()) === JSON.stringify(other.dices);
  }

  findGreaterDiceWithNumberOfSameDices(numberOfSameDice: number, diceExcluded: number | undefined = undefined): number {
    let number = [6, 5, 4, 3, 2, 1]
      .map(number => this.dices.filter((dice) => number === dice).length)
      .findIndex((x, index) => x >= numberOfSameDice && index != 6 - (diceExcluded || 999));
    let hasFoundDice = number !== -1;
    return hasFoundDice ? (6 - number) : 0;
  }
}
