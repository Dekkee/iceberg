import { all, fork } from 'redux-saga/effects';

import { saga as authSaga } from '../../../common/sagas/auth';

import { modules } from '../modules';

export function* root() {
    yield all([
        all(modules.map(m => m.saga())),
        fork(authSaga),
    ])
}
