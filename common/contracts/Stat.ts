import { User } from './User';

export interface Stat {
    rating: number;
    player: User;
}

export interface StatExtended extends Stat {
    id: string;
    createdAt: string;
}
