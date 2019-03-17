import { Action } from 'redux';
import { AuthenticationResponse } from '../api/contracts';
import { action, initActionCreators } from '../utils/actions/actionCreatorFactory';

export interface AuthenticateActionInit extends Action {
    email: string;
    password: string;
}

export interface AuthenticateActionDone extends Action {
    response: AuthenticationResponse;
}

export interface AuthenticateActionFail extends Action {
    error: Error;
}

export interface RefreshAuthenticationAction extends Action {
    token: string;
}

export interface RefreshAuthenticationActionDone extends Action {
}

export interface RefreshAuthenticationActionFail extends Action {
    error: Error;
}

export interface CancelAuthenticationAction extends Action {

}

export interface LogoutAction extends Action {

}

export const actions = {
    auth: {
        init: action((email, password) => ({ email, password })),
        done: action((response: AuthenticationResponse) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
    refresh: {
        init: action((token) => ({ token })),
        done: action(() => ({  })),
        fail: action((error: Error) => ({ error })),
    },
    cancel: action(() => ({})),
    logout: action(() => ({})),
};

initActionCreators('auth', actions);
