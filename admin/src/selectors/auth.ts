import { AuthState as AuthState, TokenState } from '../reducers/auth';
import { State } from '../reducers';

export const tokenSelector = (state: State): TokenState => state.token;
export const authSelector = (state: State): AuthState => ({ isAuthenticated: Boolean(tokenSelector(state).token) });
