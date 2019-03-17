import { combineReducers } from 'redux';
import * as auth from '../../../common/reducers/auth';
import { State } from '../../../common/reducers';

import { modules } from '../modules';

export const reducer = combineReducers<State>({
    token: auth.tokenReducer,
    ...modules.reduce((a, m) => ({...a, [m.name]: m.reducer}), {})
});

