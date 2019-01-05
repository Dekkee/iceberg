import { UserExtended } from '../../../common/contracts/User';

export interface UsersResponse {
    result: UserExtended[],
    count: number,
    receivedAt: number
}

export interface UserResponse extends UserExtended {
}

export interface AuthenticationResponse {
    token: string;
    user: string;
}
