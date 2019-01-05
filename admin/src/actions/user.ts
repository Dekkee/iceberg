import { Action } from 'redux';
import { UserResponse } from '../api/contracts';
import { action, initActionCreators } from '../../../common/utils/actions/actionCreatorFactory';
import { User } from '../../../common/contracts/User';

export interface UserCreateActionInit extends Action {
    user: User;
}

export interface UserCreateActionDone extends Action {
}

export interface UserCreateActionFail extends Action {
    error: Error;
}

export interface UserGetActionInit extends Action {
    id: string;
}

export interface UserGetActionDone extends Action {
    response: UserResponse;
}

export interface UserGetActionFail extends Action {
    error: Error;
}

export interface UserUpdateActionInit extends Action {
    user: User;
}

export interface UserUpdateActionDone extends Action {
    response: UserResponse;
}

export interface UserUpdateActionFail extends Action {
    error: Error;
}

export interface UserDeleteActionInit extends Action {
    id: string;
}

export interface UserDeleteActionDone extends Action {
    response: UserResponse;
}

export interface UserDeleteActionFail extends Action {
    error: Error;
}

export const actions = {
    create: {
        init: action((user: User) => ({ user })),
        done: action(() => ({ })),
        fail: action((error: Error) => ({ error })),
    },
    get: {
        init: action((id: string) => ({ id })),
        done: action((response: UserResponse) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
    update: {
        init: action((user: User) => ({ user })),
        done: action((response: UserResponse) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
    remove: {
        init: action((id: string) => ({ id })),
        done: action(() => ({ })),
        fail: action((error: Error) => ({ error })),
    }
};

initActionCreators('user', actions);
