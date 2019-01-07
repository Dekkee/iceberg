import { actions, UserCreateActionInit, UserDeleteActionInit, UserUpdateActionInit } from '../actions/user';
import { put, takeLatest, call } from 'redux-saga/effects';
import { UserResponse, UserListResponse } from '../api/contracts';
import { deleteUser, getUser, createUser, updateUser, listUsers } from '../api/users';
import { UserGetActionInit } from '../actions/user';
import { Action } from 'redux';

const handleFetch = function* (action: Action) {
    try {
        const response: UserListResponse = yield call(listUsers);

        yield put(actions.list.done(response));

    } catch (e) {
        yield put(actions.list.fail(e));
    }
};

const handleCreate = function* (action: UserCreateActionInit) {
    try {
        yield call(createUser, action.user);

        yield put(actions.create.done());

    } catch (e) {
        yield put(actions.create.fail(e));
    }
};

const handleGet = function* (action: UserGetActionInit) {
    try {
        const response: UserResponse = yield call(getUser, action.id);
        yield put(actions.get.done(response));

    } catch (e) {
        yield put(actions.get.fail(e));
    }
};

const handleUpdate = function* (action: UserUpdateActionInit) {
    try {
        const response: UserResponse = yield call(updateUser, action.user);

        yield put(actions.update.done(response));

    } catch (e) {
        yield put(actions.update.fail(e));
    }
};

const handleDelete = function* (action: UserDeleteActionInit) {
    try {
        yield call(deleteUser, action.id);

        yield put(actions.remove.done());
    } catch (e) {
        yield put(actions.remove.fail(e));
    }
};

export function* saga() {
    yield takeLatest(actions.create.init.type, handleCreate);
    yield takeLatest(actions.get.init.type, handleGet);
    yield takeLatest(actions.update.init.type, handleUpdate);
    yield takeLatest(actions.remove.init.type, handleDelete);
    yield takeLatest(actions.list.init.type, handleFetch);
}
