import { all, fork } from 'redux-saga/effects';

import { saga as authSaga } from './auth';

import { modules } from '../modules';

export function* root() {
    yield all([
        all(modules.map(m => m.saga())),
        fork(authSaga),
    ])
}
