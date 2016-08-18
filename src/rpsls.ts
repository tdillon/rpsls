export class RockPaperScissorsLizardSpock {

  static get TIE() { return 0; }
  static get PLAYER1() { return 1; }
  static get PLAYER2() { return 2; }

  static get ROCK() { return 0; }
  static get PAPER() { return 1; }
  static get SCISSORS() { return 2; }
  static get LIZARD() { return 3; }
  static get SPOCK() { return 4; }

  static play(p1: number, p2: number): { outcome: number, result: string } {
    return null;
  }
}
