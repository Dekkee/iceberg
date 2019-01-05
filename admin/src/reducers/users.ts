import { UserExtended } from '../../../common/contracts/User';
import { switchCase, switchReducer } from '../../../common/utils/reducers/switchReducer';
import { actions, UsersListActionDone, UsersListActionInit, UsersListActionFail } from '../actions/users';

export interface State {
    users: UserExtended[];
    count: number;
    isFetching: boolean;
}

const initialState: State = {
    users: [],
    count: 0,
    isFetching: false,
};

export const reducer = switchReducer<State>({
    ...switchCase(actions.fetch.init)((state:State, action: UsersListActionInit): State => ({
        ...state,
        isFetching: true,
    })),
    ...switchCase(actions.fetch.done)((state:State, action: UsersListActionDone): State => ({
        ...state,
        users: action.response.result,
        count: action.response.count,
        isFetching: false,
    })),
    ...switchCase(actions.fetch.fail)((state:State, action: UsersListActionFail): State => ({
        ...state,
        users: initialState.users,
        count: initialState.count,
        isFetching: false,
    })),
}, initialState);
