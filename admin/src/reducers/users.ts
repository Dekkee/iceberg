import { User } from '../api/contracts';
import { switchCase, switchReducer } from '../../../common/utils/reducers/switchReducer';
import { actions, UsersListActionDone, UsersListActionInit, UsersListActionFail } from '../actions/users';

export interface State {
    users: User[];
    count: number;
}

const initialState: State = {
    users: [],
    count: 0,
};

export const reducer = switchReducer<State>({
    ...switchCase(actions.fetch.init)((state:State, action: UsersListActionInit): State => ({
        ...state,
    })),
    ...switchCase(actions.fetch.done)((state:State, action: UsersListActionDone): State => ({
        ...state,
        users: action.response.result,
        count: action.response.count
    })),
    ...switchCase(actions.fetch.fail)((state:State, action: UsersListActionFail): State => ({
        ...state,
        users: initialState.users,
        count: initialState.count
    })),
}, initialState);
