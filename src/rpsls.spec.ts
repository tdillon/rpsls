import {RockPaperScissorsLizardSpock as R} from './rpsls'

let moves = [
  { id: R.ROCK, name: 'rock' },
  { id: R.PAPER, name: 'paper' },
  { id: R.SCISSORS, name: 'scissors' },
  { id: R.LIZARD, name: 'lizard' },
  { id: R.SPOCK, name: 'spock' }
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

  describe('Move names', () => {
    moves.forEach(m => {
      it(`move ${m.id} is ${m.name}`, () => expect(R.getMoveName(m.id)).toBe(m.name));
    });
  });


  describe('Move names TypeError', () => {
    [
      { name: 'null', value: null },
      { name: 'object', value: {} },
      { name: 'undefined', value: undefined },
      { name: 'array', value: [] },
    ].forEach((m: { name: string, value: any }) => {
      it(`${m.name} will throw an exception`, () => expect(() => R.getMoveName(m.value)).toThrowError(TypeError));
    });
  });

  describe('Move names RangeError', () => {
    [
      { name: '-1', value: -1 },
      { name: '5', value: 5 },
      { name: '0.1', value: .1 },
      { name: '3.9', value: 3.9 }
    ].forEach((m: { name: string, value: any }) => {
      it(`${m.name} will throw an exception`, () => expect(() => R.getMoveName(m.value)).toThrowError(RangeError));
    });
  });

  //TODO TEST FOR STRINGS


  describe('Gameplay testing', () => {

    describe('unexepected GAMEPLAY', () => {


      //TODO R.play(-1,5,null, undefined, '', {}, [], etc.)
      //TOOD R.getResult
      //ODOD R.getOutcome
      //TODO R.play(p1,p2) : {outcome:TIE,PLAYER1,PLAYER2, result:string(e.g., rock smashes scissors)}
    });

    describe('Tie gameplay', () => {
      moves.forEach(m => {
        describe(`${R.getMoveName(m.id)} vs ${R.getMoveName(m.id)}`, () => {
          let round = R.play(m.id, m.id);
          it(`outcome is TIE`, () => expect(round.outcome).toBe(R.TIE));
          it(`result is a tie`, () => expect(round.result).toBe(`${R.getMoveName(m.id)} vs ${R.getMoveName(m.id)} is a tie`));
        });
      });
    });

    describe('Non-tie gameplay', () => {
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
});
