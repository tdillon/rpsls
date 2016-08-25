import {RockPaperScissorsLizardSpock as R} from './rpsls'

let moves: Array<{ name: string, value: any, error?: ErrorConstructor }> = [
  { name: 'rock', value: R.ROCK },
  { name: 'paper', value: R.PAPER },
  { name: 'scissors', value: R.SCISSORS },
  { name: 'lizard', value: R.LIZARD },
  { name: 'spock', value: R.SPOCK },
  { name: 'null', value: null, error: TypeError },
  { name: '{}', value: {}, error: TypeError },
  { name: '{ move: 0 }', value: { move: 0 }, error: TypeError },
  { name: 'undefined', value: undefined, error: TypeError },
  { name: '[]', value: [], error: TypeError },
  { name: '[1]', value: [1], error: TypeError },
  { name: '() => 1', value: () => 1, error: TypeError },
  { name: '""', value: '', error: TypeError },
  { name: '" "', value: ' ', error: TypeError },
  { name: '"0"', value: '0', error: TypeError },
  { name: '"1.0"', value: '1.0', error: TypeError },
  { name: '" 2 "', value: ' 2 ', error: TypeError },
  { name: '-1', value: -1, error: RangeError },
  { name: '5', value: 5, error: RangeError },
  { name: '0.1', value: .1, error: RangeError },
  { name: '3.9', value: 3.9, error: RangeError }
];

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

  describe('getMoveName tests', () => {
    describe('Valid using move constants', () => {
      moves.filter(m => !('error' in m)).forEach(m => {
        it(`getMoveName(${m.value}) is ${m.name}`, () => expect(R.getMoveName(m.value)).toBe(m.name));
      });
    });

    describe('Invalid move names', () => {
      moves.filter(m => 'error' in m).forEach(m => {
        it(`getMoveName(${m.name}) throws a ${m.error.name}`, () => expect(() => R.getMoveName(m.value)).toThrowError(m.error));
      });
    });
  });

  describe('Gameplay testing', () => {

    describe('Valid gameplay', () => {

      describe('Ties', () => {
        moves.filter(m => !('error' in m)).forEach(m => {
          describe(`${R.getMoveName(m.value)} vs ${R.getMoveName(m.value)}`, () => {
            let round = R.play(m.value, m.value);
            it(`outcome is TIE`, () => expect(round.outcome).toBe(R.TIE));
            it(`result is a tie`, () => expect(round.result).toBe(`${R.getMoveName(m.value)} vs ${R.getMoveName(m.value)} is a tie`));
          });
        });
      });

      describe('Non-ties', () => {
        [
          { winner: R.ROCK, loser: R.SCISSORS, method: 'crushes' },
          { winner: R.ROCK, loser: R.LIZARD, method: 'crushes' },
          { winner: R.PAPER, loser: R.ROCK, method: 'covers' },
          { winner: R.PAPER, loser: R.SPOCK, method: 'disproves' },
          { winner: R.SCISSORS, loser: R.PAPER, method: 'cuts' },
          { winner: R.SCISSORS, loser: R.LIZARD, method: 'decapitates' },
          { winner: R.LIZARD, loser: R.PAPER, method: 'eats' },
          { winner: R.LIZARD, loser: R.SPOCK, method: 'poisons' },
          { winner: R.SPOCK, loser: R.ROCK, method: 'vaporizes' },
          { winner: R.SPOCK, loser: R.SCISSORS, method: 'smashes' },
        ].forEach(test => {
          let result = `${R.getMoveName(test.winner)} ${test.method} ${R.getMoveName(test.loser)}`;  //e.g., 'rock crushes scissors'
          [[test.winner, test.loser, R.PLAYER1], [test.loser, test.winner, R.PLAYER2]].forEach(g => {
            describe(`${R.getMoveName(g[0])} vs ${R.getMoveName(g[1])}`, () => {
              let round = R.play(g[0], g[1]);
              it(`winner: ${R.getMoveName(test.winner)} loser: ${R.getMoveName(test.loser)}`, () => expect(round.outcome).toBe(g[2]));
              it(result, () => expect(round.result).toBe(result));
            });
          });
        });
      });
    });

    describe('Invalid gameplay', () => {

      describe('invalid vs valid', () => {
        let validMove = moves.find(m => !('error' in m));

        moves.filter(m => 'error' in m).forEach(invalidMove => {
          [[validMove, invalidMove], [invalidMove, validMove], [invalidMove, invalidMove]].forEach(r => {
            it(`play(${r[0].name}, ${r[1].name}) throws an Error`, () => expect(() => R.play(<number>r[0].value, <number>r[1].value)).toThrowError());
          });
        });
      });

      describe('invalid vs. invalid', () => {
        moves.filter(m => 'error' in m).forEach(m1 => {
          moves.filter(m => 'error' in m).forEach(m2 => {
            it(`play(${m1.name}, ${m2.name}) throws an Error`, () => expect(() => R.play(<number>m1.value, <number>m2.value)).toThrowError());
          });
        });
      });
    });
  });
});
