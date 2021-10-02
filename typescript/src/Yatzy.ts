type Roll = [number, number, number, number, number];
export default class Yatzy {
  static chance(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return d1 + d2 + d3 + d4 + d5;
  }

  static yatzy(roll: Roll): number {
    let sum = roll.reduce((acum, number) => acum + number, 0);
    return sum === roll[0] * 5 ? 50 : 0;
  }

  static ones(roll: Roll): number {
    return this.sumDices(roll, 1);
  }

  static twos(roll: Roll): number {
    return this.sumDices(roll, 2);
  }

  static threes(roll: Roll): number {
    return this.sumDices(roll, 3);
  }

  static fours(roll: Roll): number {
    return Yatzy.sumDices(roll, 4);
  }

  static fives(roll: Roll): number {
    return Yatzy.sumDices(roll, 5);
  }

  static sixes(roll: Roll): number {
    return Yatzy.sumDices(roll, 6);
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

  private static sumDices(roll: Roll, diceNumber: number) {
    return roll
        .filter(dice => dice === diceNumber)
        .reduce((acum, number) => acum + number, 0);
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
