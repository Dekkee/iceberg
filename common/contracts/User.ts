export interface User {
    displayName?: string;
    email: string;
}

export interface UserExtended extends User {
    isAdmin: boolean;
}
