import {UserType} from './UserType.enum'

export interface PlayerData {
    userType: UserType;
    humanMove: number;
    css: {
        moves: string;
        user: string;
    }
}