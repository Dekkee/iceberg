export interface AuthenticationResponse {
    token: string;
    user: string;
}

export interface ListResponse<T> {
    result: T[],
    count: number,
    receivedAt: number
}
