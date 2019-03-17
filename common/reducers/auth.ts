import { switchCase, switchReducer } from '../utils/reducers/switchReducer';
import {
    actions,
    AuthenticateActionInit,
    AuthenticateActionDone,
    AuthenticateActionFail,
    CancelAuthenticationAction,
    LogoutAction,
    RefreshAuthenticationAction,
    RefreshAuthenticationActionDone,
    RefreshAuthenticationActionFail
} from '../actions/auth';
import { persistReducer } from '../utils/reducers/persistReducer';

export interface AuthState {
    isAuthenticated: boolean;
}

export interface TokenState {
    token?: string;
    user?: string;
}

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
    ...switchCase(actions.refresh.init)((state: TokenState, action: RefreshAuthenticationAction): TokenState => ({
        ...state,
    })),
    ...switchCase(actions.refresh.done)((state: TokenState, action: RefreshAuthenticationActionDone): TokenState => ({
        ...state,
    })),
    ...switchCase(actions.refresh.fail)((state: TokenState, action: RefreshAuthenticationActionFail): TokenState => ({
        ...state,
        token: undefined,
        user: undefined,
    })),
    ...switchCase(actions.cancel)((state: TokenState, action: CancelAuthenticationAction): TokenState => ({
        ...state,
        token: undefined,
        user: undefined,
    })),
    ...switchCase(actions.logout)((state: TokenState, action: LogoutAction): TokenState => ({
        ...state,
        token: undefined,
        user: undefined,
    })),
}, {}));
