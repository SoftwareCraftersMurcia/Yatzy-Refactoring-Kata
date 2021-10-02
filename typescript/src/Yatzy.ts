type Roll = [number, number, number, number, number];
export default class Yatzy {
  private dice: Roll;

  constructor(d1: number, d2: number, d3: number, d4: number, d5: number) {
    this.dice = [d1, d2, d3, d4, d5];
  }

  static chance(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return d1 + d2 + d3 + d4 + d5;
  }

  static yatzy(...args: number[]): number {
    let sum = args.reduce((acum, number) => acum + number, 0);
    return sum === args[0] * 5 ? 50 : 0;
  }

  static ones(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return this.sumDices([d1, d2, d3, d4, d5], 1);
  }

  static twos(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return this.sumDices([d1, d2, d3, d4, d5], 2);
  }

  static threes(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    return this.sumDices([d1, d2, d3, d4, d5], 3);
  }

  fours(): number {
    return Yatzy.sumDices(this.dice, 4);
  }

  fives(): number {
    return Yatzy.sumDices(this.dice, 5);
  }

  sixes(): number {
    return Yatzy.sumDices(this.dice, 6);
  }

  static score_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    let number = [6, 5, 4, 3, 2, 1]
      .map(number => [d1, d2, d3, d4, d5].filter(roll => number === roll).length)
      .findIndex(x => x >= 2);
    let hasPair = number !== -1;
    return hasPair ? (6 - number) * 2 : 0;
  }

  static two_pair(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    let numberOfRolls = [6, 5, 4, 3, 2, 1]
      .map(number => [d1, d2, d3, d4, d5].filter(roll => number === roll).length);
    let firstDice = numberOfRolls.findIndex(x => x >= 2);
    let secondDice = numberOfRolls.findIndex((x, index) => x >= 2 && index > firstDice);

    return (6 - firstDice) * 2 + (6 - secondDice) * 2;
  }

  static four_of_a_kind(_1: number, _2: number, d3: number, d4: number, d5: number): number {
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[_1 - 1]++;
    tallies[_2 - 1]++;
    tallies[d3 - 1]++;
    tallies[d4 - 1]++;
    tallies[d5 - 1]++;
    for (let i = 0; i < 6; i++) if (tallies[i] >= 4) return (i + 1) * 4;
    return 0;
  }

  static three_of_a_kind(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var t;
    t = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    t[d1 - 1]++;
    t[d2 - 1]++;
    t[d3 - 1]++;
    t[d4 - 1]++;
    t[d5 - 1]++;
    for (let i = 0; i < 6; i++) if (t[i] >= 3) return (i + 1) * 3;
    return 0;
  }

  static smallStraight(d1: number, d2: number, d3: number, d4: number, d5: number): number {
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0];
    tallies[d1 - 1] += 1;
    tallies[d2 - 1] += 1;
    tallies[d3 - 1] += 1;
    tallies[d4 - 1] += 1;
    tallies[d5 - 1] += 1;
    if (tallies[0] == 1 && tallies[1] == 1 && tallies[2] == 1 && tallies[3] == 1 && tallies[4] == 1) return 15;
    return 0;
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
}
