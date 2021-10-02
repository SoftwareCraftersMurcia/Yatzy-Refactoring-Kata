type Roll = [number, number, number, number, number];
export default class Yatzy {
  private roll: Roll;

  constructor(d1: number, d2: number, d3: number, d4: number, d5: number) {
    this.roll = [d1, d2, d3, d4, d5];
  }

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

  fours(): number {
    return Yatzy.sumDices(this.roll, 4);
  }

  fives(): number {
    return Yatzy.sumDices(this.roll, 5);
  }

  sixes(): number {
    return Yatzy.sumDices(this.roll, 6);
  }

  static score_pair(...roll: number[]): number {
    return 2 * this.findGreaterDiceWithDicesEqual(roll as Roll, 2);
  }

  static two_pair(...roll: number[]): number {
    let firstDice = this.findGreaterDiceWithDicesEqual(roll as Roll, 2);
    let secondDice = this.findGreaterDiceWithDicesEqual(roll as Roll, 2, firstDice);
    let hasTwoPair = firstDice && secondDice;
    return hasTwoPair ? firstDice * 2 + secondDice * 2 : 0;
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

  static largeStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[d1 - 1] += 1;
    tallies[d2 - 1] += 1;
    tallies[d3 - 1] += 1;
    tallies[d4 - 1] += 1;
    tallies[d5 - 1] += 1;
    if (tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1 && tallies[5] == 1) return 20;
    return 0;
  }

  static fullHouse(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var tallies;
    var _2 = false;
    var i;
    var _2_at = 0;
    var _3 = false;
    var _3_at = 0;

    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[d1 - 1] += 1;
    tallies[d2 - 1] += 1;
    tallies[d3 - 1] += 1;
    tallies[d4 - 1] += 1;
    tallies[d5 - 1] += 1;

    for (i = 0; i != 6; i += 1)
      if (tallies[i] == 2) {
        _2 = true;
        _2_at = i + 1;
      }

    for (i = 0; i != 6; i += 1)
      if (tallies[i] == 3) {
        _3 = true;
        _3_at = i + 1;
      }

    if (_2 && _3) return _2_at * 2 + _3_at * 3;
    else return 0;
  }

  private static sumDices(roll: Roll, diceNumber: number) {
    return roll
        .filter(dice => dice === diceNumber)
        .reduce((acum, number) => acum + number, 0);
  }

  private static findGreaterDiceWithDicesEqual(roll: Roll, numberOfSameDice: number, diceExcluded: number|undefined = undefined) {
    let number = [6, 5, 4, 3, 2, 1]
      .map(number => roll.filter((dice) => number === dice).length)
      .findIndex((x, index) => x >= numberOfSameDice && index > 6 - (diceExcluded || 999));
    let hasPair = number !== -1;
    return hasPair ? (6 - number) : 0;
  }

  private static sameRolls(roll: Roll, other: Roll) {
    return JSON.stringify(roll.sort()) === JSON.stringify(other);
  }
}
