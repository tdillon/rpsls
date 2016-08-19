System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var privateData, RockPaperScissorsLizardSpock;
    return {
        setters:[],
        execute: function() {
            //Use a WeakMap until class static fields are available.  ES 2017?
            privateData = new WeakMap();
            RockPaperScissorsLizardSpock = (function () {
                function RockPaperScissorsLizardSpock() {
                }
                Object.defineProperty(RockPaperScissorsLizardSpock, "TIE", {
                    get: function () { return 0; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RockPaperScissorsLizardSpock, "PLAYER1", {
                    get: function () { return 1; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RockPaperScissorsLizardSpock, "PLAYER2", {
                    get: function () { return 2; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RockPaperScissorsLizardSpock, "ROCK", {
                    get: function () { return 0; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RockPaperScissorsLizardSpock, "PAPER", {
                    get: function () { return 1; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RockPaperScissorsLizardSpock, "SCISSORS", {
                    get: function () { return 2; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RockPaperScissorsLizardSpock, "LIZARD", {
                    get: function () { return 3; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RockPaperScissorsLizardSpock, "SPOCK", {
                    get: function () { return 4; },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * TODO
                 */
                RockPaperScissorsLizardSpock.getMoveName = function (move) {
                    //TODO test for valid move, if not throw error
                    return privateData.get(RockPaperScissorsLizardSpock).moves[move];
                };
                /**
                 * TODO DESCRIBE THE class
                 * @parm p1 number TODO player 1 move
                 * @parm p2 number TODO player 2 move
                 * @returns foo bar
                 * @return foo bar
                 */
                RockPaperScissorsLizardSpock.play = function (p1, p2) {
                    //TODO make this a weakmap so it is not created all the time
                    var rules = [
                        [, , 'crushes', 'crushes',],
                        ['covers', , , , 'disproves'],
                        [, 'cuts', , 'decapitates',],
                        [, 'eats', , , 'poisons'],
                        ['vaporizes', , 'smashes', ,]
                    ];
                    //TODO handle for non-numerics too
                    if (p1 < 0 || p1 > 4 || p2 < 0 || p2 > 4) {
                        throw new RangeError("Moves must be 0, 1, 2, 3, or 4.  (" + p1 + ", " + p2 + ")");
                    }
                    if (p1 === p2) {
                        return { outcome: RockPaperScissorsLizardSpock.TIE, result: RockPaperScissorsLizardSpock.getMoveName(p1) + " vs " + RockPaperScissorsLizardSpock.getMoveName(p2) + " is a tie" };
                    }
                    else if (rules[p1][p2]) {
                        return { outcome: RockPaperScissorsLizardSpock.PLAYER1, result: RockPaperScissorsLizardSpock.getMoveName(p1) + " " + rules[p1][p2] + " " + RockPaperScissorsLizardSpock.getMoveName(p2) };
                    }
                    else {
                        return { outcome: RockPaperScissorsLizardSpock.PLAYER2, result: RockPaperScissorsLizardSpock.getMoveName(p2) + " " + rules[p2][p1] + " " + RockPaperScissorsLizardSpock.getMoveName(p1) };
                    }
                };
                return RockPaperScissorsLizardSpock;
            }());
            exports_1("RockPaperScissorsLizardSpock", RockPaperScissorsLizardSpock);
            privateData.set(RockPaperScissorsLizardSpock, {
                moves: ['rock', 'paper', 'scissors', 'lizard', 'spock']
            });
        }
    }
});
//# sourceMappingURL=rpsls.js.map