export interface User {
    displayName?: string;
    email: string;
}

export interface UserExtended extends User {
    id: string;
    isAdmin: boolean;
}
