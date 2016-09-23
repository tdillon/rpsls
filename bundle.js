(function () {
'use strict';

//Use a WeakMap until class static fields are available.  ES 2017?
const privateData = new WeakMap();
class RockPaperScissorsLizardSpock {
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
    static getMoveName(move) {
        RockPaperScissorsLizardSpock._validateMove(move);
        return privateData.get(RockPaperScissorsLizardSpock).moves[move];
    }
    /**
     * Return an object containing the outcome and result of player one's (p1) move vs player two's move (p2).
     * The outcome property of the returned object will be TIE, PLAYER1, or PLAYER2.
     * The result property of the returned object will be a string that describes the outcome.
     */
    static play(p1, p2) {
        RockPaperScissorsLizardSpock._validateMove(p1);
        RockPaperScissorsLizardSpock._validateMove(p2);
        let rules = privateData.get(RockPaperScissorsLizardSpock).rules;
        if (p1 === p2) {
            return {
                outcome: RockPaperScissorsLizardSpock.TIE,
                result: `${RockPaperScissorsLizardSpock.getMoveName(p1)} vs ${RockPaperScissorsLizardSpock.getMoveName(p2)} is a tie`
            };
        }
        else if (rules[p1][p2]) {
            return {
                outcome: RockPaperScissorsLizardSpock.PLAYER1,
                result: `${RockPaperScissorsLizardSpock.getMoveName(p1)} ${rules[p1][p2]} ${RockPaperScissorsLizardSpock.getMoveName(p2)}`,
                method: rules[p1][p2],
                winner: p1,
                loser: p2
            };
        }
        else {
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
    static _validateMove(move) {
        if (typeof move !== 'number') {
            throw new TypeError(`Move must be an integer between 0 and 4.  Got ${move}`);
        }
        else if ((move < 0) || (move > 4) || (move % 1 !== 0)) {
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

class StatService {
    constructor() {
        this._emptyStats = {
            games: 0, ties: 0,
            p1: { wins: 0, losses: 0, moves: [{ count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }] },
            p2: { wins: 0, losses: 0, moves: [{ count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }] }
        };
        this._STORAGE_KEY = 'stats';
    }
    getStats() {
        let temp;
        if (this._stats) {
        }
        else if (temp = localStorage.getItem(this._STORAGE_KEY)) {
            this._stats = JSON.parse(temp);
        }
        else {
            this._stats = this._emptyStats;
        }
        return this._stats;
    }
    saveStats(s) {
        this._stats = s;
        localStorage.setItem(this._STORAGE_KEY, JSON.stringify(this._stats));
    }
}

var UserType;
(function (UserType) {
    UserType[UserType["HUMAN"] = 0] = "HUMAN";
    UserType[UserType["BOT"] = 1] = "BOT";
})(UserType || (UserType = {}));

class StatService$2 {
    constructor() {
        this._STORAGE_KEY = 'players';
        this._defaultPlayers = [
            { userType: UserType.HUMAN, humanMove: null, css: { moves: '#panMoves > :first-child i', user: '#panUserSelect > :first-child' } },
            { userType: UserType.BOT, humanMove: null, css: { moves: '#panMoves > :last-child i', user: '#panUserSelect > :last-child' } }
        ];
    }
    getPlayers() {
        let temp;
        if (this._players) {
        }
        else if (temp = localStorage.getItem(this._STORAGE_KEY)) {
            this._players = JSON.parse(temp);
        }
        else {
            this._players = this._defaultPlayers;
        }
        return this._players;
    }
    savePlayers(players) {
        this._players = players;
        localStorage.setItem(this._STORAGE_KEY, JSON.stringify(this._players));
    }
}

/**
 * Dear future Travis:
 * I know this is a garage way of doing things.
 * Sincerly,
 * current Travis
 */
const PLAYER1 = 0;
const PLAYER2 = 1;
let statService = new StatService();
let playerService = new StatService$2();
let stats = statService.getStats();
let players = playerService.getPlayers();
let iconClasses = ['fa-hand-rock-o', 'fa-hand-paper-o', 'fa-hand-scissors-o', 'fa-hand-lizard-o', 'fa-hand-spock-o'];
let [panP1Human, panP1Toggle, panP1Bot, panP2Human, panP2Toggle, panP2Bot] = [...document.querySelectorAll('#panUserSelect i')];
let [spanP1Game, spanP1Win, spanP1WinPercent, spanP1Lose, spanP1LosePercent, spanP1Tie, spanP1TiePercent, spanP2Game, spanP2Win, spanP2WinPercent, spanP2Lose, spanP2LosePercent, spanP2Tie, spanP2TiePercent] = [...document.querySelectorAll('#panStats1 span')];
let [p1RoC, p1RoP, p1RoWN, p1RoWP, p1RoLN, p1RoLP, p1RoTN, p1RoTP, p2RoC, p2RoP, p2RoWN, p2RoWP, p2RoLN, p2RoLP, p2RoTN, p2RoTP] = [...document.querySelectorAll('#panStatsRock span')];
let [p1PaC, p1PaP, p1PaWN, p1PaWP, p1PaLN, p1PaLP, p1PaTN, p1PaTP, p2PaC, p2PaP, p2PaWN, p2PaWP, p2PaLN, p2PaLP, p2PaTN, p2PaTP] = [...document.querySelectorAll('#panStatsPaper span')];
let [p1ScC, p1ScP, p1ScWN, p1ScWP, p1ScLN, p1ScLP, p1ScTN, p1ScTP, p2ScC, p2ScP, p2ScWN, p2ScWP, p2ScLN, p2ScLP, p2ScTN, p2ScTP] = [...document.querySelectorAll('#panStatsScissors span')];
let [p1LiC, p1LiP, p1LiWN, p1LiWP, p1LiLN, p1LiLP, p1LiTN, p1LiTP, p2LiC, p2LiP, p2LiWN, p2LiWP, p2LiLN, p2LiLP, p2LiTN, p2LiTP] = [...document.querySelectorAll('#panStatsLizard span')];
let [p1SpC, p1SpP, p1SpWN, p1SpWP, p1SpLN, p1SpLP, p1SpTN, p1SpTP, p2SpC, p2SpP, p2SpWN, p2SpWP, p2SpLN, p2SpLP, p2SpTN, p2SpTP] = [...document.querySelectorAll('#panStatsSpock span')];
let [iP1Rock, iP1Paper, iP1Scissors, iP1Lizard, iP1Spock, iP2Rock, iP2Paper, iP2Scissors, iP2Lizard, iP2Spock] = [...document.querySelectorAll('#panMoves i')];
let [iP1, iP2] = [...document.querySelectorAll('#panRecentGame i')];
let [svgP1W, svgP1L, svgP1T, svgP2W, svgP2L, svgP2T, svgP1RoW, svgP1RoL, svgP1RoT, svgP2RoW, svgP2RoL, svgP2RoT, svgP1PaW, svgP1PaL, svgP1PaT, svgP2PaW, svgP2PaL, svgP2PaT, svgP1ScW, svgP1ScL, svgP1ScT, svgP2ScW, svgP2ScL, svgP2ScT, svgP1LiW, svgP1LiL, svgP1LiT, svgP2LiW, svgP2LiL, svgP2LiT, svgP1SpW, svgP1SpL, svgP1SpT, svgP2SpW, svgP2SpL, svgP2SpT] = [...document.querySelectorAll('path')];
//Add click handler to all rpsls icons, and set the correct class on the user type selector.
players.forEach((p) => {
    [...document.querySelectorAll(p.css.moves)].forEach(iMove => {
        iMove.addEventListener('click', e => {
            if (p.userType === UserType.HUMAN) {
                //TODO add class
                p.humanMove = parseInt(e.target.dataset['move']);
            }
        });
    });
    //Set class for player 1 & 2 user type selector.
    document.querySelector(p.css.user).className = (p.userType === UserType.BOT ? 'bot' : 'human');
});
//Set click events for player 1 & 2's human, toggle, and bot buttons.
panP1Human.addEventListener('click', () => players[PLAYER1].userType = UserType.HUMAN);
panP1Bot.addEventListener('click', () => players[PLAYER1].userType = UserType.BOT);
panP2Human.addEventListener('click', () => players[PLAYER2].userType = UserType.HUMAN);
panP2Bot.addEventListener('click', () => players[PLAYER2].userType = UserType.BOT);
panP1Toggle.addEventListener('click', () => players[PLAYER1].userType = (players[PLAYER1].userType === UserType.BOT ? UserType.HUMAN : UserType.BOT));
panP2Toggle.addEventListener('click', () => players[PLAYER2].userType = (players[PLAYER2].userType === UserType.BOT ? UserType.HUMAN : UserType.BOT));
[panP1Human, panP2Human].forEach(p => p.addEventListener('click', () => { p.parentElement.className = 'human'; }));
[panP1Toggle, panP2Toggle].forEach(p => p.addEventListener('click', () => { p.parentElement.className = (p.parentElement.className === 'human' ? 'bot' : 'human'); }));
[panP1Bot, panP2Bot].forEach(p => p.addEventListener('click', () => { p.parentElement.className = 'bot'; }));
[panP1Human, panP1Toggle, panP1Bot, panP2Human, panP2Toggle, panP2Bot].forEach(ele => ele.addEventListener('click', () => playerService.savePlayers(players)));
let writeStatsToUI = () => {
    spanP1Game.textContent = spanP2Game.textContent = stats.games.toString();
    spanP1TiePercent.textContent = spanP2TiePercent.textContent = (100 * stats.ties / stats.games).toFixed(2).toString();
    spanP1Tie.textContent = spanP2Tie.textContent = stats.ties.toString();
    spanP1Win.textContent = stats.p1.wins.toString();
    spanP1WinPercent.textContent = (100 * stats.p1.wins / stats.games).toFixed(2).toString();
    spanP1Lose.textContent = stats.p1.losses.toString();
    spanP1LosePercent.textContent = (100 * stats.p1.losses / stats.games).toFixed(2).toString();
    spanP2Win.textContent = stats.p2.wins.toString();
    spanP2WinPercent.textContent = (100 * stats.p2.wins / stats.games).toFixed(2).toString();
    spanP2Lose.textContent = stats.p2.losses.toString();
    spanP2LosePercent.textContent = (100 * stats.p2.losses / stats.games).toFixed(2).toString();
    p1RoC.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].count.toString();
    p1RoP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].count / stats.games).toFixed(2).toString();
    p2RoC.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].count.toString();
    p2RoP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].count / stats.games).toFixed(2).toString();
    p1PaC.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].count.toString();
    p1PaP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].count / stats.games).toFixed(2).toString();
    p2PaC.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].count.toString();
    p2PaP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].count / stats.games).toFixed(2).toString();
    p1ScC.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].count.toString();
    p1ScP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].count / stats.games).toFixed(2).toString();
    p2ScC.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].count.toString();
    p2ScP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].count / stats.games).toFixed(2).toString();
    p1LiC.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].count.toString();
    p1LiP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].count / stats.games).toFixed(2).toString();
    p2LiC.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].count.toString();
    p2LiP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].count / stats.games).toFixed(2).toString();
    p1SpC.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].count.toString();
    p1SpP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].count / stats.games).toFixed(2).toString();
    p2SpC.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].count.toString();
    p2SpP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].count / stats.games).toFixed(2).toString();
    p1RoWN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].wins.toString();
    p1PaWN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].wins.toString();
    p1ScWN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].wins.toString();
    p1LiWN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].wins.toString();
    p1SpWN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].wins.toString();
    p1RoLN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].losses.toString();
    p1PaLN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].losses.toString();
    p1ScLN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].losses.toString();
    p1LiLN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].losses.toString();
    p1SpLN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].losses.toString();
    p1RoTN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].ties.toString();
    p1PaTN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].ties.toString();
    p1ScTN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].ties.toString();
    p1LiTN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].ties.toString();
    p1SpTN.textContent = stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].ties.toString();
    p1RoWP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].wins / stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].count).toFixed(2).toString();
    p1PaWP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].wins / stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].count).toFixed(2).toString();
    p1ScWP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].wins / stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].count).toFixed(2).toString();
    p1LiWP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].wins / stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].count).toFixed(2).toString();
    p1SpWP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].wins / stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].count).toFixed(2).toString();
    p1RoLP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].losses / stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].count).toFixed(2).toString();
    p1PaLP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].losses / stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].count).toFixed(2).toString();
    p1ScLP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].losses / stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].count).toFixed(2).toString();
    p1LiLP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].losses / stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].count).toFixed(2).toString();
    p1SpLP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].losses / stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].count).toFixed(2).toString();
    p1RoTP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].ties / stats.p1.moves[RockPaperScissorsLizardSpock.ROCK].count).toFixed(2).toString();
    p1PaTP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].ties / stats.p1.moves[RockPaperScissorsLizardSpock.PAPER].count).toFixed(2).toString();
    p1ScTP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].ties / stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS].count).toFixed(2).toString();
    p1LiTP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].ties / stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD].count).toFixed(2).toString();
    p1SpTP.textContent = (100 * stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].ties / stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK].count).toFixed(2).toString();
    p2RoWN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].wins.toString();
    p2PaWN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].wins.toString();
    p2ScWN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].wins.toString();
    p2LiWN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].wins.toString();
    p2SpWN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].wins.toString();
    p2RoLN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].losses.toString();
    p2PaLN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].losses.toString();
    p2ScLN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].losses.toString();
    p2LiLN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].losses.toString();
    p2SpLN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].losses.toString();
    p2RoTN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].ties.toString();
    p2PaTN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].ties.toString();
    p2ScTN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].ties.toString();
    p2LiTN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].ties.toString();
    p2SpTN.textContent = stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].ties.toString();
    p2RoWP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].wins / stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].count).toFixed(2).toString();
    p2PaWP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].wins / stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].count).toFixed(2).toString();
    p2ScWP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].wins / stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].count).toFixed(2).toString();
    p2LiWP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].wins / stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].count).toFixed(2).toString();
    p2SpWP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].wins / stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].count).toFixed(2).toString();
    p2RoLP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].losses / stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].count).toFixed(2).toString();
    p2PaLP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].losses / stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].count).toFixed(2).toString();
    p2ScLP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].losses / stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].count).toFixed(2).toString();
    p2LiLP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].losses / stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].count).toFixed(2).toString();
    p2SpLP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].losses / stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].count).toFixed(2).toString();
    p2RoTP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].ties / stats.p2.moves[RockPaperScissorsLizardSpock.ROCK].count).toFixed(2).toString();
    p2PaTP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].ties / stats.p2.moves[RockPaperScissorsLizardSpock.PAPER].count).toFixed(2).toString();
    p2ScTP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].ties / stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS].count).toFixed(2).toString();
    p2LiTP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].ties / stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD].count).toFixed(2).toString();
    p2SpTP.textContent = (100 * stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].ties / stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK].count).toFixed(2).toString();
    //TODO white more stats e.g., rpsls based stats, best streaks
    svgP1W.setAttribute('d', getPathD(0, 100 * stats.p1.wins / stats.games));
    svgP1L.setAttribute('d', getPathD(100 * stats.p1.wins / stats.games, 100 * stats.p1.losses / stats.games));
    svgP1T.setAttribute('d', getPathD(100 * (stats.p1.wins + stats.p1.losses) / stats.games, 100 * stats.ties / stats.games));
    svgP2W.setAttribute('d', getPathD(0, 100 * stats.p2.wins / stats.games));
    svgP2L.setAttribute('d', getPathD(100 * stats.p2.wins / stats.games, 100 * stats.p2.losses / stats.games));
    svgP2T.setAttribute('d', getPathD(100 * (stats.p2.wins + stats.p2.losses) / stats.games, 100 * stats.ties / stats.games));
    [
        { svgW: svgP1RoW, svgL: svgP1RoL, svgT: svgP1RoT, move: stats.p1.moves[RockPaperScissorsLizardSpock.ROCK] },
        { svgW: svgP1PaW, svgL: svgP1PaL, svgT: svgP1PaT, move: stats.p1.moves[RockPaperScissorsLizardSpock.PAPER] },
        { svgW: svgP1ScW, svgL: svgP1ScL, svgT: svgP1ScT, move: stats.p1.moves[RockPaperScissorsLizardSpock.SCISSORS] },
        { svgW: svgP1LiW, svgL: svgP1LiL, svgT: svgP1LiT, move: stats.p1.moves[RockPaperScissorsLizardSpock.LIZARD] },
        { svgW: svgP1SpW, svgL: svgP1SpL, svgT: svgP1SpT, move: stats.p1.moves[RockPaperScissorsLizardSpock.SPOCK] },
        { svgW: svgP2RoW, svgL: svgP2RoL, svgT: svgP2RoT, move: stats.p2.moves[RockPaperScissorsLizardSpock.ROCK] },
        { svgW: svgP2PaW, svgL: svgP2PaL, svgT: svgP2PaT, move: stats.p2.moves[RockPaperScissorsLizardSpock.PAPER] },
        { svgW: svgP2ScW, svgL: svgP2ScL, svgT: svgP2ScT, move: stats.p2.moves[RockPaperScissorsLizardSpock.SCISSORS] },
        { svgW: svgP2LiW, svgL: svgP2LiL, svgT: svgP2LiT, move: stats.p2.moves[RockPaperScissorsLizardSpock.LIZARD] },
        { svgW: svgP2SpW, svgL: svgP2SpL, svgT: svgP2SpT, move: stats.p2.moves[RockPaperScissorsLizardSpock.SPOCK] },
    ].forEach(a => {
        a.svgW.setAttribute('d', getPathD(0, 100 * a.move.wins / a.move.count));
        a.svgL.setAttribute('d', getPathD(100 * a.move.wins / a.move.count, 100 * a.move.losses / a.move.count));
        a.svgT.setAttribute('d', getPathD(100 * (a.move.wins + a.move.losses) / a.move.count, 100 * a.move.ties / a.move.count));
    });
};
let getPathD = (start, per) => {
    let radius = 25;
    let largearcflag = (per > 50 ? 1 : 0);
    let center = { x: 30, y: 30 };
    let begin = {
        x: Math.sin(start * Math.PI / 50) * radius + center.x,
        y: -Math.cos(start * Math.PI / 50) * radius + center.y
    };
    let end = {
        x: Math.sin((start + per) * Math.PI / 50) * radius + center.x,
        y: -Math.cos((start + per) * Math.PI / 50) * radius + center.y
    };
    return `M ${begin.x} ${begin.y} A ${radius} ${radius} 0 ${largearcflag} 1 ${end.x} ${end.y}`;
};
let gameLoop = () => {
    requestAnimationFrame(gameLoop);
    if ((players[PLAYER1].userType === UserType.HUMAN && !Number.isInteger(players[PLAYER1].humanMove)) || (players[PLAYER2].userType === UserType.HUMAN && !Number.isInteger(players[PLAYER2].humanMove))) {
        return; //wait for human to move
    }
    let p1Move = (players[PLAYER1].userType === UserType.HUMAN ? players[PLAYER1].humanMove : Math.floor(Math.random() * 5));
    let p2Move = (players[PLAYER2].userType === UserType.HUMAN ? players[PLAYER2].humanMove : Math.floor(Math.random() * 5));
    let g = RockPaperScissorsLizardSpock.play(p1Move, p2Move);
    //TODO add 'best streak' to stats
    ++stats.games;
    ++stats.p1.moves[p1Move].count;
    ++stats.p2.moves[p2Move].count;
    switch (g.outcome) {
        case RockPaperScissorsLizardSpock.TIE:
            ++stats.p1.moves[p1Move].ties;
            ++stats.p2.moves[p2Move].ties;
            ++stats.ties;
            break;
        case RockPaperScissorsLizardSpock.PLAYER1:
            ++stats.p1.moves[p1Move].wins;
            ++stats.p2.moves[p2Move].losses;
            ++stats.p1.wins;
            ++stats.p2.losses;
            break;
        case RockPaperScissorsLizardSpock.PLAYER2:
            ++stats.p1.moves[p1Move].losses;
            ++stats.p2.moves[p2Move].wins;
            ++stats.p1.losses;
            ++stats.p2.wins;
            break;
    }
    writeStatsToUI();
    //Upate 'last move' UI.
    iP1.className = `fa ${iconClasses[p1Move]}`;
    iP2.className = `fa ${iconClasses[p2Move]}`;
    document.querySelector('#panRecentGame > :last-child').textContent = g.result;
    players[PLAYER1].humanMove = players[PLAYER2].humanMove = null;
    statService.saveStats(stats);
    playerService.savePlayers(players);
};
writeStatsToUI();
requestAnimationFrame(gameLoop);

}());
