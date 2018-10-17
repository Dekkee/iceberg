import { Action } from 'redux';
import { AuthenticationResponse } from '../api/contracts';
import { action, initActionCreators } from '../../../common/utils/actions/actionCreatorFactory';

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

export interface CancelAuthenticationActionInit extends Action {

}

export const actions = {
    auth: {
        init: action((email, password) => ({ email, password })),
        done: action((response: AuthenticationResponse) => ({ response })),
        fail: action((error: Error) => ({ error })),
    },
    cancel: action(() => ({}))
};

initActionCreators('auth', actions);
