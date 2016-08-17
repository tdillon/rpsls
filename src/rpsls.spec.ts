import {RockPaperScissorsLizardSpock as R} from './rpsls'

describe('Rock Paper Scissors Lizard Spock library tests', () => {

  it('rock-paper-scissors-lizard-spock class exists', () => expect(R).toBeDefined());

  //OUTCOMES
  it('TIE is 0', () => expect(R.TIE).toBe(0));
  it('PLAYER1 is 1', () => expect(R.PLAYER1).toBe(1));
  it('PLAYER2 is 2', () => expect(R.PLAYER2).toBe(2));

  //MOVES
  it('ROCK is 0', () => expect(R.ROCK).toBe(0));
  it('PAPER is 1', () => expect(R.PAPER).toBe(1));
  it('SCISSORS is 2', () => expect(R.SCISSORS).toBe(2));
  it('LIZARD is 3', () => expect(R.LIZARD).toBe(3));
  it('SPOCK is 4', () => expect(R.SPOCK).toBe(4));

  //TIES
  it('Rock vs Rock is a tie', () => expect(R.play(R.ROCK, R.ROCK)).toBe(R.TIE));
  it('Paper vs Paper is a tie', () => expect(R.play(R.PAPER, R.PAPER)).toBe(R.TIE));
  it('Scissors vs Scissors is a tie', () => expect(R.play(R.SCISSORS, R.SCISSORS)).toBe(R.TIE));
  it('Lizard vs Lizard is a tie', () => expect(R.play(R.LIZARD, R.LIZARD)).toBe(R.TIE));
  it('Spock vs Spock is a tie', () => expect(R.play(R.SPOCK, R.SPOCK)).toBe(R.TIE));

  //ROCK vs SCISSORS
  it('Rock crushes Scissors', () => expect(R.play(R.ROCK, R.SCISSORS)).toBe(R.PLAYER1));
  it('Rock crushes Scissors', () => expect(R.play(R.SCISSORS, R.ROCK)).toBe(R.PLAYER2));

  //ROCK vs LIZARD
  it('Rock crushes Lizard', () => expect(R.play(R.ROCK, R.LIZARD)).toBe(R.PLAYER1));
  it('Rock crushes Lizard', () => expect(R.play(R.LIZARD, R.ROCK)).toBe(R.PLAYER2));

  //PAPER vs ROCK
  it('Paper covers Rock', () => expect(R.play(R.PAPER, R.ROCK)).toBe(R.PLAYER1));
  it('Paper covers Rock', () => expect(R.play(R.ROCK, R.PAPER)).toBe(R.PLAYER2));

  //PAPER vs SPOCK
  it('Paper disproves Spock', () => expect(R.play(R.PAPER, R.SPOCK)).toBe(R.PLAYER1));
  it('Paper disproves Spock', () => expect(R.play(R.SPOCK, R.PAPER)).toBe(R.PLAYER2));

  //SCISSORS vs PAPER
  it('Scissors cuts Paper', () => expect(R.play(R.SCISSORS, R.PAPER)).toBe(R.PLAYER1));
  it('Scissors cuts Paper', () => expect(R.play(R.PAPER, R.SCISSORS)).toBe(R.PLAYER2));

  //SCISSORS vs LIZARD
  it('Scissors decapitates Lizard', () => expect(R.play(R.SCISSORS, R.LIZARD)).toBe(R.PLAYER1));
  it('Scissors decapitates Lizard', () => expect(R.play(R.LIZARD, R.SCISSORS)).toBe(R.PLAYER2));

  //LIZARD vs PAPER
  it('Lizard eats Paper', () => expect(R.play(R.LIZARD, R.PAPER)).toBe(R.PLAYER1));
  it('Lizard eats Paper', () => expect(R.play(R.PAPER, R.LIZARD)).toBe(R.PLAYER2));

  //LIZARD vs SPOCK
  it('Lizard poisons Spock', () => expect(R.play(R.LIZARD, R.SPOCK)).toBe(R.PLAYER1));
  it('Lizard poisons Spock', () => expect(R.play(R.SPOCK, R.LIZARD)).toBe(R.PLAYER2));

  //SPOCK vs ROCK
  it('Spock vaporizes Rock', () => expect(R.play(R.SPOCK, R.ROCK)).toBe(R.PLAYER1));
  it('Spock vaporizes Rock', () => expect(R.play(R.ROCK, R.SPOCK)).toBe(R.PLAYER2));

  //SPOCK vs SCISSORS
  it('Spock smashes Scissors', () => expect(R.play(R.SPOCK, R.SCISSORS)).toBe(R.PLAYER1));
  it('Spock smashes Scissors', () => expect(R.play(R.SCISSORS, R.SPOCK)).toBe(R.PLAYER2));
});
