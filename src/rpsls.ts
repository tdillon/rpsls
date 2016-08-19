//Use a WeakMap until class static fields are available.  ES 2017?
const privateData = new WeakMap<Function, { moves: Array<string> }>();

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
    //TODO test for valid move, if not throw error
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
    //TODO make this a weakmap so it is not created all the time
    let rules: Array<Array<string>> = [
      [, , 'crushes', 'crushes',],
      ['covers', , , , 'disproves'],
      [, 'cuts', , 'decapitates',],
      [, 'eats', , , 'poisons'],
      ['vaporizes', , 'smashes', ,]
    ];

    //TODO handle for non-numerics too
    if (p1 < 0 || p1 > 4 || p2 < 0 || p2 > 4) {
      throw new RangeError(`Moves must be 0, 1, 2, 3, or 4.  (${p1}, ${p2})`);
    }

    if (p1 === p2) {  //TIE
      return { outcome: RockPaperScissorsLizardSpock.TIE, result: `${RockPaperScissorsLizardSpock.getMoveName(p1)} vs ${RockPaperScissorsLizardSpock.getMoveName(p2)} is a tie` };
    } else if (rules[p1][p2]) {  //PLAYER 1
      return { outcome: RockPaperScissorsLizardSpock.PLAYER1, result: `${RockPaperScissorsLizardSpock.getMoveName(p1)} ${rules[p1][p2]} ${RockPaperScissorsLizardSpock.getMoveName(p2)}` };
    } else {  //PLAYER 2
      return { outcome: RockPaperScissorsLizardSpock.PLAYER2, result: `${RockPaperScissorsLizardSpock.getMoveName(p2)} ${rules[p2][p1]} ${RockPaperScissorsLizardSpock.getMoveName(p1)}` };
    }
  }
}

privateData.set(RockPaperScissorsLizardSpock, {
  moves: ['rock', 'paper', 'scissors', 'lizard', 'spock']
});
