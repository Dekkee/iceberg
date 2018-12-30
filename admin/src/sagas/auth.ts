import { actions, RefreshAuthenticationAction } from '../actions/auth';
import { put, takeLatest, call } from 'redux-saga/effects';
import { AuthenticationResponse } from '../api/contracts';
import { login, refresh } from '../api';
import { AuthenticateActionInit, LogoutAction } from '../actions/auth';
import { history } from '../history';

const handleFetch = function* (action: AuthenticateActionInit) {
    try {
        const response: AuthenticationResponse = yield call(login, action.email, action.password);

        yield put(actions.auth.done(response));

    } catch (e) {
        yield put(actions.auth.fail(e));
    }
};

const handleRerfresh = function* (action: RefreshAuthenticationAction) {
    try {
        yield call(refresh, action.token);
        yield put(actions.refresh.done());

    } catch (e) {
        yield put(actions.refresh.fail(e));
    }
};

const handleLogout = function* (action: LogoutAction) {
    history.push('/admin');
};

export function* saga() {
    yield takeLatest(actions.auth.init.type, handleFetch);
    yield takeLatest(actions.refresh.init.type, handleRerfresh);
    yield takeLatest(actions.logout.type, handleLogout);
}
