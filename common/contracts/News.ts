import { User } from './User';

export interface News {
    title: string;
    spoiler: string;
    content: string;
    author: User;
}

export interface NewsExtended extends News {
    id: string;
    createdAt: string;
}
