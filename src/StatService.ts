export default class StatService {
    _stats: Stats;
    _emptyStats = {
        games: 0, ties: 0,
        p1: { wins: 0, losses: 0, moves: [{ count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }] },
        p2: { wins: 0, losses: 0, moves: [{ count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }, { count: 0, wins: 0, losses: 0, ties: 0 }] }
    };
    _STORAGE_KEY = 'stats';


    getStats(): Stats {
        let temp: string;

        if (this._stats) {
            //good to go
        } else if (temp = localStorage.getItem(this._STORAGE_KEY)) {
            this._stats = JSON.parse(temp);
        } else {
            this._stats = this._emptyStats;
        }

        return this._stats;
    }

    saveStats(s: Stats) {
        this._stats = s;
        localStorage.setItem(this._STORAGE_KEY, JSON.stringify(this._stats));
    }
}