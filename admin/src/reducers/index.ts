import { combineReducers } from 'redux';
import * as auth from './auth';

import { modules } from '../modules';

export const reducer = combineReducers<State>({
    token: auth.tokenReducer,
    ...modules.reduce((a, m) => ({...a, [m.name]: m.reducer}), {})
});

export interface State {
    token: auth.TokenState,
}
