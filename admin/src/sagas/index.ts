import { all, fork } from 'redux-saga/effects';

import { saga as userSaga } from './user';
import { saga as newsSaga } from './news';
import { saga as authSaga } from './auth';

export function* root() {
    yield all([
        fork(userSaga),
        fork(newsSaga),
        fork(authSaga),
    ])
}
