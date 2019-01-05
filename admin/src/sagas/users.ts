import { actions } from '../actions/users';
import { put, takeLatest, call } from 'redux-saga/effects';
import { Action } from 'redux';
import { UsersResponse } from '../api/contracts';
import { getUsers } from '../api/users';

const handleFetch = function* (action: Action) {
    try {
        const response: UsersResponse = yield call(getUsers);

        yield put(actions.fetch.done(response));

    } catch (e) {
        yield put(actions.fetch.fail(e));
    }
};

export function* saga() {
    yield takeLatest(actions.fetch.init.type, handleFetch);
}
