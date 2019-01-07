import { combineReducers } from 'redux';
import * as user from './user';
import * as auth from './auth';
import * as news from './news';

export const reducer = combineReducers<State>({
    user: user.reducer,
    news: news.reducer,
    token: auth.tokenReducer,
});

export interface State {
    user: user.State,
    news: news.State,
    token: auth.TokenState,
}
