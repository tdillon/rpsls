import {RockPaperScissorsLizardSpock as R} from './rpsls'

describe('Rock Paper Scissors Lizard Spock library tests', () => {

  it('rock-paper-scissors-lizard-spock class exists', () => expect(R).toBeDefined());

  describe('Outcome constants', () => {
    it('TIE is 0', () => expect(R.TIE).toBe(0));
    it('PLAYER1 is 1', () => expect(R.PLAYER1).toBe(1));
    it('PLAYER2 is 2', () => expect(R.PLAYER2).toBe(2));
  });

  describe('Move constants', () => {
    it('ROCK is 0', () => expect(R.ROCK).toBe(0));
    it('PAPER is 1', () => expect(R.PAPER).toBe(1));
    it('SCISSORS is 2', () => expect(R.SCISSORS).toBe(2));
    it('LIZARD is 3', () => expect(R.LIZARD).toBe(3));
    it('SPOCK is 4', () => expect(R.SPOCK).toBe(4));
  });

  describe('Move names', () => {
    [
      { id: R.ROCK, name: 'rock' },
      { id: R.PAPER, name: 'paper' },
      { id: R.SCISSORS, name: 'scissors' },
      { id: R.LIZARD, name: 'lizard' },
      { id: R.SPOCK, name: 'spock' }
    ].forEach(m => {
      it(`move ${m.id} is ${m.name}`, () => expect(R.getMoveName(m.id)).toBe(m.name));
    });
  });

  describe('All GAMEPLAY testing', () => {

    describe('unexepected GAMEPLAY', () => {
      //TODO R.play(-1,5,null, undefined, '', {}, [], etc.)
      //TOOD R.getResult
      //ODOD R.getOutcome
      //TODO R.play(p1,p2) : {outcome:TIE,PLAYER1,PLAYER2, result:string(e.g., rock smashes scissors)}
    });

    describe('GAMEPLAY that produce ties', () => {
      describe('tie GAMEPLAY outcomes', () => {
        it('rock vs rock', () => expect(R.play(R.ROCK, R.ROCK).outcome).toBe(R.TIE));
        it('paper vs paper', () => expect(R.play(R.PAPER, R.PAPER).outcome).toBe(R.TIE));
        it('scissors vs scissors', () => expect(R.play(R.SCISSORS, R.SCISSORS).outcome).toBe(R.TIE));
        it('lizard vs lizard', () => expect(R.play(R.LIZARD, R.LIZARD).outcome).toBe(R.TIE));
        it('spock vs spock', () => expect(R.play(R.SPOCK, R.SPOCK).outcome).toBe(R.TIE));
      });
      describe('tie GAMEPLAY results', () => {
        it('rock vs rock', () => expect(R.play(R.ROCK, R.ROCK).result).toBe('rock vs rock is a tie'));
        it('paper vs paper', () => expect(R.play(R.PAPER, R.PAPER).result).toBe('paper vs paper is a tie'));
        it('scissors vs scissors', () => expect(R.play(R.SCISSORS, R.SCISSORS).result).toBe('scissors vs scissors is a tie'));
        it('lizard vs lizard', () => expect(R.play(R.LIZARD, R.LIZARD).result).toBe('lizard vs lizard is a tie'));
        it('spock vs spock', () => expect(R.play(R.SPOCK, R.SPOCK).result).toBe('spock vs spock is a tie'));
      });
    });

    [
      { winner: R.ROCK, loser: R.SCISSORS, result: `${R.getMoveName(R.ROCK)} crushes ${R.getMoveName(R.SCISSORS)}` },
      { winner: R.ROCK, loser: R.LIZARD, result: `${R.getMoveName(R.ROCK)} crushes ${R.getMoveName(R.LIZARD)}` },
      { winner: R.PAPER, loser: R.ROCK, result: `${R.getMoveName(R.PAPER)} covers ${R.getMoveName(R.ROCK)}` },
      { winner: R.PAPER, loser: R.SPOCK, result: `${R.getMoveName(R.PAPER)} disproves ${R.getMoveName(R.SPOCK)}` },
      { winner: R.SCISSORS, loser: R.PAPER, result: `${R.getMoveName(R.SCISSORS)} cuts ${R.getMoveName(R.PAPER)}` },
      { winner: R.SCISSORS, loser: R.LIZARD, result: `${R.getMoveName(R.SCISSORS)} decapitates ${R.getMoveName(R.LIZARD)}` },
      { winner: R.LIZARD, loser: R.PAPER, result: `${R.getMoveName(R.LIZARD)} eats ${R.getMoveName(R.PAPER)}` },
      { winner: R.LIZARD, loser: R.SPOCK, result: `${R.getMoveName(R.LIZARD)} poisons ${R.getMoveName(R.SPOCK)}` },
      { winner: R.SPOCK, loser: R.ROCK, result: `${R.getMoveName(R.SPOCK)} vaporizes ${R.getMoveName(R.ROCK)}` },
      { winner: R.SPOCK, loser: R.SCISSORS, result: `${R.getMoveName(R.SPOCK)} smashes ${R.getMoveName(R.SCISSORS)}` },
    ].forEach(test => {
      [[test.winner, test.loser, R.PLAYER1], [test.loser, test.winner, R.PLAYER2]].forEach(g => {
        describe(`${R.getMoveName(g[0])} vs ${R.getMoveName(g[1])} GAMEPLAY`, () => {
          let g1 = R.play(g[0], g[1]);
          it(`${R.getMoveName(g[0])} vs ${R.getMoveName(g[1])} outcome`, () => expect(g1.outcome).toBe(g[2]));
          it(`${R.getMoveName(g[0])} vs ${R.getMoveName(g[1])} result`, () => expect(g1.result).toBe(test.result));
        });
      });
    });
  });
});
