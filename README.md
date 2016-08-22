# rpsls

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![npm][npm-image]][npm-url]

The canonical rock-paper-scissors-lizard-spock library.

## Usage

```javascript
//import library and alias
import {RockPaperScissorsLizardSpock as R} from 'rpsls'

//The 5 moves are static getters.
//They are aliases for the numbers 0-4.
console.log(
  R.ROCK,     //0
  R.PAPER,    //1
  R.SCISSORS, //2
  R.LIZARD,   //3
  R.SPOCK     //4  
);

//The 3 outcomes are static getters.
//They are aliases for the numbers 0-2
console.log(
  R.TIE,     //0
  R.PLAYER1, //1
  R.PLAYER2  //2
);

//The static method "play" takes 2 moves and returns an object.
//The return object with have 2 properties, outcome and result.
let r = R.play(R.PAPER, R.SPOCK);
console.log(
  r.outcome, //1
  r.result   //'paper disproves spock'
)

//The static method "getMoveName" takes a move and returns a string.
//The returned string will be a readable move name.
console.log(
  R.getMoveName(R.ROCK)), //rock
  R.getMoveName(0)),      //rock
  R.getMoveName('0')      //rock
);

//ERROR HANDLING
//"play" and "getMoveName" will throw errors if
//  unexpected parameters are supplied.
try {
  R.play('foo', null);
  R.getMoveName(-1);
} catch (e) {
  console.log('Why?');
}

```

## Dev Process

This serves as a reminder to myself of how to develop this project.

* clone repo
* npm i
* npm run typings
* edit .ts/.spec.ts
* npm run build
* npm test
* update npm version
* commit

[travis-image]: https://travis-ci.org/tdillon/rpsls.svg?branch=master
[travis-url]: https://travis-ci.org/tdillon/rpsls

[coveralls-image]: https://coveralls.io/repos/tdillon/rpsls/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/tdillon/rpsls?branch=master

[npm-image]: https://img.shields.io/npm/v/rpsls.svg
[npm-url]: https://www.npmjs.com/package/rpsls
