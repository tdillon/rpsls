import {PlayerData} from './PlayerData.interface'
import {UserType} from './UserType.enum'

export default class StatService {
    _players: Array<PlayerData>;
    _STORAGE_KEY = 'players';
    _defaultPlayers: Array<PlayerData> = [
        { userType: UserType.HUMAN, humanMove: null, css: { moves: '#panMoves > :first-child i', user: '#panUserSelect > :first-child' } },
        { userType: UserType.BOT, humanMove: null, css: { moves: '#panMoves > :last-child i', user: '#panUserSelect > :last-child' } }
    ];


    getPlayers(): Array<any> {
        let temp: string;

        if (this._players) {
            //good to go
        } else if (temp = localStorage.getItem(this._STORAGE_KEY)) {
            this._players = JSON.parse(temp);
        } else {
            this._players = this._defaultPlayers;
        }

        return this._players;
    }

    savePlayers(players: Array<PlayerData>) {
        this._players = players;
        localStorage.setItem(this._STORAGE_KEY, JSON.stringify(this._players));
    }
}