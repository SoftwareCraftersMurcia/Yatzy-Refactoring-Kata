type Roll = [number, number, number, number, number];
class Dices {
  private dices: number[];

  constructor(...dices: number[]) {
    this.dices = dices;
  }

  sum() {
    return this.dices.reduce((acum, number) => acum + number, 0);
  }

  with(number: number) {
    let dices = this.dices
      .filter(dice => dice === number)
      .reduce((acum, number) => acum + number, 0);
    return new Dices(dices);
  }

  static from(roll: Roll) {
    return new Dices(...roll);
  }
}

export default class Yatzy {
  static chance(roll: Roll): number {
    return new Dices(...roll).sum();
  }

  static yatzy(roll: Roll): number {
    let sum = new Dices(...roll).sum();
    return sum === roll[0] * 5 ? 50 : 0;
  }

  static ones(roll: Roll): number {
    return Dices.from(roll).with(1).sum();
  }

  static twos(roll: Roll): number {
    return Dices.from(roll).with(2).sum();
  }

  static threes(roll: Roll): number {
    return Dices.from(roll).with(3).sum();
  }

  static fours(roll: Roll): number {
    return Dices.from(roll).with(4).sum();
  }

  static fives(roll: Roll): number {
    return Dices.from(roll).with(5).sum();
  }

  static sixes(roll: Roll): number {
    return Dices.from(roll).with(6).sum();
  }

  static score_pair(roll: Roll): number {
    return 2 * this.findGreaterDiceWithDicesEqual(roll, 2);
  }

  static two_pair(roll: Roll): number {
    let firstDice = this.findGreaterDiceWithDicesEqual(roll, 2);
    let secondDice = this.findGreaterDiceWithDicesEqual(roll, 2, firstDice);
    let isTwoPair = firstDice && secondDice;
    return isTwoPair ? firstDice * 2 + secondDice * 2 : 0;
  }

  static three_of_a_kind(roll: Roll): number {
    return 3 * this.findGreaterDiceWithDicesEqual(roll, 3);
  }

  static four_of_a_kind(roll: Roll): number {
    return 4 * this.findGreaterDiceWithDicesEqual(roll, 4);
  }

  static smallStraight(roll: Roll): number {
    return this.sameRolls(roll, [1, 2, 3, 4, 5] as Roll) ? 15 : 0;
  }

  static largeStraight(roll: Roll): number {
    return this.sameRolls(roll, [2, 3, 4, 5, 6] as Roll) ? 20 : 0;
  }

  static fullHouse(roll: Roll): number {
    let threeOfAKind = this.findGreaterDiceWithDicesEqual(roll, 3);
    let twoOfAKind = this.findGreaterDiceWithDicesEqual(roll, 2, threeOfAKind);
    let isFullHouse = threeOfAKind !== 0 && twoOfAKind !==0;
    return isFullHouse ? threeOfAKind * 3 + twoOfAKind *2 : 0;
  }

  private static findGreaterDiceWithDicesEqual(roll: Roll, numberOfSameDice: number, diceExcluded: number|undefined = undefined) {
    let number = [6, 5, 4, 3, 2, 1]
      .map(number => roll.filter((dice) => number === dice).length)
      .findIndex((x, index) => x >= numberOfSameDice && index != 6 - (diceExcluded || 999));
    let hasPair = number !== -1;
    return hasPair ? (6 - number) : 0;
  }

  private static sameRolls(roll: Roll, other: Roll) {
    return JSON.stringify(roll.sort()) === JSON.stringify(other);
  }
}
