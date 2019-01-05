import { combineReducers } from 'redux';
import * as users from './users';
import * as user from './user';
import * as auth from './auth';

export const reducer = combineReducers<State>({
    users: users.reducer,
    user: user.reducer,
    token: auth.tokenReducer,
});

export interface State {
    users: users.State,
    user: user.State,
    token: auth.TokenState,
}
