# rpsls

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![npm][npm-image]][npm-url]

The canonical rock-paper-scissors-lizard-spock library.

## Installation

```shell
npm i --save rpsls
```

## Usage

### Import library

The default export is a class with only static members.

```javascript
import R from 'rpsls'
```

### static members

The class will contain the following static members.  See the explanation for each member in the sections below.

* TIE
* PLAYER1
* PLAYER2
* ROCK
* PAPER
* SCISSORS
* LIZARD
* SPOCK
* getMoveName
* play

### Moves

The five moves in the game are accessed via static getters.
They are aliases for the number 0 through 4.

```javascript
console.log(
  R.ROCK,     //0
  R.PAPER,    //1
  R.SCISSORS, //2
  R.LIZARD,   //3
  R.SPOCK     //4  
);
```

### Outcomes

The three outcomes of the game are static getters.
They are aliases for the numbers 0, 1, and 2.

```javascript
console.log(
  R.TIE,     //0
  R.PLAYER1, //1
  R.PLAYER2  //2
);
```

### `play`

The static `play` method requires two parameters that represent the moves for player 1 and player 2 respectively.
An object will be returned with the details of the game.
The structure of the return object varies slightly depending upon whether the game is a tie or not.

#### Returned object for a TIE

```javascript
let game = R.play(R.ROCK, R.ROCK);

//game will look like this
{
  outcome: 0,  //TIE
  result: "rock vs rock is a tie"
}
```

#### Returned object for a NON-TIE

```javascript
let game = R.play(R.SPOCK, R.LIZARD);

//game will look like this
{
  outcome: 2,  //PLAYER2
  winner: 3,   //LIZARD
  loser: 4,    //SPOCK
  method: 'poisons'
  result: 'lizard poisons spock'
}
```

### `getMoveName`

The static `getMoveName` method takes a single parameter that represents a move.  A string will be returned that is the readable name of the given move.

```javascript
R.getMoveName(R.SPOCK);  //'spock'
R.getMoveName(4);        //'spock'
```

### Error Handling

Both `play` and `getMoveName` with throw an error if anything besides the integer numeric values of `0, 1, 2, 3, 4` are passed to them.

```javascript
R.play(R.ROCK, 'foo');  //error
R.play(R.ROCK, '2');    //error
R.play(R.ROCK, 1.1);    //error
R.play(R.ROCK, 5);      //error
R.getMoveName('bar');   //error
R.getMoveName('2');     //error
R.getMoveName(1.1);     //error
R.getMoveName(5);       //error
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
