import { AuthState as AuthState, TokenState } from '../reducers/auth';
import {State} from '../reducers';

export const authSelector = (state: State): AuthState => state.auth;
export const tokenSelector = (state: State): TokenState => state.token;
