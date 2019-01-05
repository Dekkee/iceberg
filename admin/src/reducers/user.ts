import { UserExtended } from '../../../common/contracts/User';
import { switchCase, switchReducer } from '../../../common/utils/reducers/switchReducer';
import {
    actions,
    UserCreateActionDone,
    UserCreateActionFail,
    UserCreateActionInit,
    UserDeleteActionDone,
    UserDeleteActionFail,
    UserDeleteActionInit,
    UserGetActionDone,
    UserGetActionFail,
    UserGetActionInit,
    UserUpdateActionDone,
    UserUpdateActionFail,
    UserUpdateActionInit
} from '../actions/user';

export interface State {
    user?: UserExtended;
    isFetching: boolean;
    error?: Error;
}

const initialState: State = {
    user: null,
    isFetching: false,
};

export const reducer = switchReducer<State>({
    ...switchCase(actions.create.init)((state:State, action: UserCreateActionInit): State => ({
        ...state,
        error: undefined,
        user: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.create.done)((state:State, action: UserCreateActionDone): State => ({
        ...state,
        isFetching: false,
    })),
    ...switchCase(actions.create.fail)((state:State, action: UserCreateActionFail): State => ({
        ...state,
        user: null,
        error: action.error,
        isFetching: false,
    })),

    ...switchCase(actions.get.init)((state:State, action: UserGetActionInit): State => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.get.done)((state:State, action: UserGetActionDone): State => ({
        ...state,
        user: action.response,
        isFetching: false,
    })),
    ...switchCase(actions.get.fail)((state:State, action: UserGetActionFail): State => ({
        ...state,
        user: null,
        error: action.error,
        isFetching: false,
    })),

    ...switchCase(actions.update.init)((state:State, action: UserUpdateActionInit): State => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.update.done)((state:State, action: UserUpdateActionDone): State => ({
        ...state,
        user: action.response,
        isFetching: false,
    })),
    ...switchCase(actions.update.fail)((state:State, action: UserUpdateActionFail): State => ({
        ...state,
        user: null,
        error: action.error,
        isFetching: false,
    })),

    ...switchCase(actions.remove.init)((state:State, action: UserDeleteActionInit): State => ({
        ...state,
        error: undefined,
        isFetching: true,
    })),
    ...switchCase(actions.remove.done)((state:State, action: UserDeleteActionDone): State => ({
        ...state,
        user: action.response,
        isFetching: false,
    })),
    ...switchCase(actions.remove.fail)((state:State, action: UserDeleteActionFail): State => ({
        ...state,
        user: null,
        error: action.error,
        isFetching: false,
    })),
}, initialState);
