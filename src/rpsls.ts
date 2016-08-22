//Use a WeakMap until class static fields are available.  ES 2017?
const privateData = new WeakMap<Function, { moves: Array<string>, rules: Array<Array<string>> }>();

export class RockPaperScissorsLizardSpock {

  static get TIE() { return 0; }
  static get PLAYER1() { return 1; }
  static get PLAYER2() { return 2; }

  static get ROCK() { return 0; }
  static get PAPER() { return 1; }
  static get SCISSORS() { return 2; }
  static get LIZARD() { return 3; }
  static get SPOCK() { return 4; }

  /**
   * TODO
   */
  static getMoveName(move: number): string {
    move = RockPaperScissorsLizardSpock._cleanMove(move);
    return privateData.get(RockPaperScissorsLizardSpock).moves[move];
  }

  /**
   * TODO DESCRIBE THE class
   * @parm p1 number TODO player 1 move
   * @parm p2 number TODO player 2 move
   * @returns foo bar
   * @return foo bar
   */
  static play(p1: number, p2: number): { outcome: number, result: string } {
    p1 = RockPaperScissorsLizardSpock._cleanMove(p1);
    p2 = RockPaperScissorsLizardSpock._cleanMove(p2);

    let rules = privateData.get(RockPaperScissorsLizardSpock).rules;

    if (p1 === p2) {  //TIE
      return { outcome: RockPaperScissorsLizardSpock.TIE, result: `${RockPaperScissorsLizardSpock.getMoveName(p1)} vs ${RockPaperScissorsLizardSpock.getMoveName(p2)} is a tie` };
    } else if (rules[p1][p2]) {  //PLAYER 1
      return { outcome: RockPaperScissorsLizardSpock.PLAYER1, result: `${RockPaperScissorsLizardSpock.getMoveName(p1)} ${rules[p1][p2]} ${RockPaperScissorsLizardSpock.getMoveName(p2)}` };
    } else {  //PLAYER 2
      return { outcome: RockPaperScissorsLizardSpock.PLAYER2, result: `${RockPaperScissorsLizardSpock.getMoveName(p2)} ${rules[p2][p1]} ${RockPaperScissorsLizardSpock.getMoveName(p1)}` };
    }
  }


  /**
   * TODO
   *
   * @private
   */
  private static _cleanMove(num: number) {
    if (typeof num !== 'number' && typeof num !== 'string') {
      throw new TypeError(`Move must be an integer between 0 and 4.  Got ${num}`);
    } else if ((num < 0) || (num > 4) || (num % 1 !== 0)) {
      throw new RangeError(`Move must be an integer between 0 and 4.  Got ${num}`);
    }

    return num;
  }

}

privateData.set(RockPaperScissorsLizardSpock, {
  moves: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
  rules: [
    [, , 'crushes', 'crushes',],
    ['covers', , , , 'disproves'],
    [, 'cuts', , 'decapitates',],
    [, 'eats', , , 'poisons'],
    ['vaporizes', , 'smashes', ,]
  ]
});
