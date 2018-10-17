import { all, fork } from 'redux-saga/effects';

import { saga as usersSaga } from './users';
import { saga as authSaga } from './auth';

export function* root() {
    yield all([
        fork(usersSaga),
        fork(authSaga),
    ])
}
