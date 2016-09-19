
//Use a WeakMap until class static fields are available.  ES 2017?
const privateData = new WeakMap<Function, { moves: Array<string>, rules: Array<Array<string>> }>();

export default class RockPaperScissorsLizardSpock {

  /** Constant for a tie outcome, 0 */
  static get TIE() { return 0; }
  /** Constant for a player 1 victory, 1 */
  static get PLAYER1() { return 1; }
  /** Constant for a player 2 victory, 2 */
  static get PLAYER2() { return 2; }

  /** Constant for a rock move, 0. */
  static get ROCK() { return 0; }
  /** Constant for a paper move, 1. */
  static get PAPER() { return 1; }
  /** Constant for a scissors move, 2. */
  static get SCISSORS() { return 2; }
  /** Constant for a lizard move, 3. */
  static get LIZARD() { return 3; }
  /** Constant for a spock move, 4. */
  static get SPOCK() { return 4; }

  /**
   * Return the string representation of the given move.
   */
  static getMoveName(move: number): string {
    RockPaperScissorsLizardSpock._validateMove(move);
    return privateData.get(RockPaperScissorsLizardSpock).moves[move];
  }

  /**
   * Return an object containing the outcome and result of player one's (p1) move vs player two's move (p2).
   * The outcome property of the returned object will be TIE, PLAYER1, or PLAYER2.
   * The result property of the returned object will be a string that describes the outcome.
   */
  static play(p1: number, p2: number): { outcome: number, result: string, method?: string, winner?: number, loser?: number } {
    RockPaperScissorsLizardSpock._validateMove(p1);
    RockPaperScissorsLizardSpock._validateMove(p2);

    let rules = privateData.get(RockPaperScissorsLizardSpock).rules;

    if (p1 === p2) {  //TIE
      return {
        outcome: RockPaperScissorsLizardSpock.TIE,
        result: `${RockPaperScissorsLizardSpock.getMoveName(p1)} vs ${RockPaperScissorsLizardSpock.getMoveName(p2)} is a tie`
      };
    } else if (rules[p1][p2]) {  //PLAYER 1
      return {
        outcome: RockPaperScissorsLizardSpock.PLAYER1,
        result: `${RockPaperScissorsLizardSpock.getMoveName(p1)} ${rules[p1][p2]} ${RockPaperScissorsLizardSpock.getMoveName(p2)}`,
        method: rules[p1][p2],
        winner: p1,
        loser: p2
      };
    } else {  //PLAYER 2
      return {
        outcome: RockPaperScissorsLizardSpock.PLAYER2,
        result: `${RockPaperScissorsLizardSpock.getMoveName(p2)} ${rules[p2][p1]} ${RockPaperScissorsLizardSpock.getMoveName(p1)}`,
        method: rules[p2][p1],
        winner: p2,
        loser: p1
      };
    }
  }

  /**
   * Verify whether a move is valid.
   * If not, throw an error.
   */
  private static _validateMove(move: number) {
    if (typeof move !== 'number') {
      throw new TypeError(`Move must be an integer between 0 and 4.  Got ${move}`);
    } else if ((move < 0) || (move > 4) || (move % 1 !== 0)) {
      throw new RangeError(`Move must be an integer between 0 and 4.  Got ${move}`);
    }
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
