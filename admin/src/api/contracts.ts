import { UserExtended } from '../../../common/contracts/User';
import { NewsExtended } from '../../../common/contracts/News';

export interface UserListResponse {
    result: UserExtended[],
    count: number,
    receivedAt: number
}

export interface UserResponse extends UserExtended {
}

export interface NewsResponse extends NewsExtended {
}

export interface AuthenticationResponse {
    token: string;
    user: string;
}

export interface ListResponse<T> {
    result: T[],
    count: number,
    receivedAt: number
}
