import { switchCase, switchReducer } from '../../../common/utils/reducers/switchReducer';
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
    ...switchCase(actions.refresh.init)((state: AuthState, action: RefreshAuthenticationAction): AuthState => ({
        ...state,
        isAuthenticated: false,
    })),
    ...switchCase(actions.refresh.done)((state: AuthState, action: RefreshAuthenticationActionDone): AuthState => ({
        ...state,
        isAuthenticated: true,
    })),
    ...switchCase(actions.refresh.fail)((state: AuthState, action: RefreshAuthenticationActionFail): AuthState => ({
        ...state,
        isAuthenticated: false,
    })),
    ...switchCase(actions.cancel)((state: AuthState, action: CancelAuthenticationAction): AuthState => ({
        ...state,
        isAuthenticated: false,
    })),
    ...switchCase(actions.logout)((state: AuthState, action: LogoutAction): AuthState => ({
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
