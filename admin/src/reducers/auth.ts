import { switchCase, switchReducer } from '../../../common/utils/reducers/switchReducer';
import {
    actions,
    AuthenticateActionInit,
    AuthenticateActionDone,
    AuthenticateActionFail,
    CancelAuthenticationActionInit
} from '../actions/auth';
import { persistReducer } from '../../../common/utils/reducers/persistReducer';

export interface AuthState {
    isAuthenticated: boolean;
}

export interface TokenState {
    token?: string;
    user?: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
};

export const authReducer = switchReducer<AuthState>({
    ...switchCase(actions.auth.init)((state: AuthState, action: AuthenticateActionInit): AuthState => ({
        ...state,
        isAuthenticated: false,
    })),
    ...switchCase(actions.auth.done)((state: AuthState, action: AuthenticateActionDone): AuthState => ({
        ...state,
        isAuthenticated: true,
    })),
    ...switchCase(actions.auth.fail)((state: AuthState, action: AuthenticateActionFail): AuthState => ({
        ...state,
        isAuthenticated: false,
    })),
    ...switchCase(actions.cancel)((state: AuthState, action: CancelAuthenticationActionInit): AuthState => ({
        ...state,
        isAuthenticated: false,
    })),
}, initialState);

export const tokenReducer = persistReducer('auth', switchReducer<TokenState>({
    ...switchCase(actions.auth.init)((state: TokenState, action: AuthenticateActionInit): TokenState => ({
        ...state,
        token: undefined,
        user: undefined,
    })),
    ...switchCase(actions.auth.done)((state: TokenState, action: AuthenticateActionDone): TokenState => ({
        ...state,
        token: action.response.token,
        user: action.response.user,
    })),
    ...switchCase(actions.auth.fail)((state: TokenState, action: AuthenticateActionFail): TokenState => ({
        ...state,
        token: undefined,
        user: undefined,
    })),
    ...switchCase(actions.cancel)((state: TokenState, action: CancelAuthenticationActionInit): TokenState => ({
        ...state,
        token: undefined,
        user: undefined,
    })),
}, {}));
