export interface Champ {
    title: string;
    description: string;
}

export interface ChampExtended extends Champ {
    id: string;
    createdAt: string;
}
