export interface Contacts {
    content: string;
}

export interface ContactsExtended extends Contacts {
    id: string;
    createdAt: string;
}
