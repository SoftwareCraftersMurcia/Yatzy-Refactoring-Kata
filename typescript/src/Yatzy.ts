type Roll = [number, number, number, number, number];
export default class Yatzy {
  static chance(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return d1 + d2 + d3 + d4 + d5;
  }

  static yatzy(...args: number[]): number {
    let sum = args.reduce((acum, number) => acum + number, 0);
    return sum === args[0] * 5 ? 50 : 0;
  }

  static ones(...roll: number[]): number {
    return this.sumDices(roll as Roll, 1);
  }

  static twos(...roll: number[]): number {
    return this.sumDices(roll as Roll, 2);
  }

  static threes(...roll: number[]): number {
    return this.sumDices(roll as Roll, 3);
  }

  static fours(...roll: number[]): number {
    return Yatzy.sumDices(roll as Roll, 4);
  }

  static fives(...roll: number[]): number {
    return Yatzy.sumDices(roll as Roll, 5);
  }

  static sixes(...roll: number[]): number {
    return Yatzy.sumDices(roll as Roll, 6);
  }

  static score_pair(...roll: number[]): number {
    return 2 * this.findGreaterDiceWithDicesEqual(roll as Roll, 2);
  }

  static two_pair(...roll: number[]): number {
    let firstDice = this.findGreaterDiceWithDicesEqual(roll as Roll, 2);
    let secondDice = this.findGreaterDiceWithDicesEqual(roll as Roll, 2, firstDice);
    let isTwoPair = firstDice && secondDice;
    return isTwoPair ? firstDice * 2 + secondDice * 2 : 0;
  }

  static three_of_a_kind(...roll: number[]): number {
    return 3 * this.findGreaterDiceWithDicesEqual(roll as Roll, 3);
  }

  static four_of_a_kind(...roll: number[]): number {
    return 4 * this.findGreaterDiceWithDicesEqual(roll as Roll, 4);
  }

  static smallStraight(...roll: number[]): number {
    return this.sameRolls(roll as Roll, [1, 2, 3, 4, 5] as Roll) ? 15 : 0;
  }

  static largeStraight(...roll: number[]): number {
    return this.sameRolls(roll as Roll, [2, 3, 4, 5, 6] as Roll) ? 20 : 0;
  }

  static fullHouse(...roll: number[]): number {
    let threeOfAKind = this.findGreaterDiceWithDicesEqual(roll as Roll, 3);
    let twoOfAKind = this.findGreaterDiceWithDicesEqual(roll as Roll, 2, threeOfAKind);
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
