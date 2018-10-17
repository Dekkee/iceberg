export interface User {
    email: string;
}

export interface UsersResponse {
    result: User[],
    count: number,
    receivedAt: number
}

export interface AuthenticationResponse {
    token: string;
    user: string;
}
