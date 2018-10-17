import { actions } from '../actions/auth';
import { put, takeLatest, call } from 'redux-saga/effects';
import { AuthenticationResponse } from '../api/contracts';
import { login } from '../api';
import { AuthenticateActionInit } from '../actions/auth';

const handleFetch = function* (action: AuthenticateActionInit) {
    try {
        const response: AuthenticationResponse = yield call(login, action.email, action.password);

        yield put(actions.auth.done(response));

    } catch (e) {
        yield put(actions.auth.fail(e));
    }
};

export function* saga() {
    yield takeLatest(actions.auth.init.type, handleFetch);
}
