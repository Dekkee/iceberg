import { combineReducers } from 'redux';
import * as users from './users';
import * as auth from './auth';

export const reducer = combineReducers<State>({
    users: users.reducer,
    auth: auth.authReducer,
    token: auth.tokenReducer,
});

export interface State {
    users: users.State,
    auth: auth.AuthState,
    token: auth.TokenState,
}
