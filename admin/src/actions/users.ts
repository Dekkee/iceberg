import { Action } from 'redux';
import { UsersResponse } from '../api/contracts';
import { action, initActionCreators } from '../../../common/utils/actions/actionCreatorFactory';

export interface UsersListActionInit extends Action {

}

export interface UsersListActionDone extends Action {
    response: UsersResponse;
}

export interface UsersListActionFail extends Action {
    error: Error;
}

export const actions = {
    fetch: {
        init: action(() => ({ })),
        done: action((response: UsersResponse) => ({ response })),
        fail: action((error: Error) => ({ error })),
    }
};

initActionCreators('users', actions);
