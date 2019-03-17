import {
    EntityCreateActionInit,
    EntityDeleteActionInit,
    EntityUpdateActionInit,
    EntityGetActionInit,
    CrudActions
} from '../actions/common';
import { put, takeLatest, call } from 'redux-saga/effects';
import { ListResponse } from '../api/contracts';
import { Action } from 'redux';
import { CrudApi } from '../api/common';
import { history } from '../history';

export const generateSagas = <T>(moduleName: string, actions: CrudActions, api: CrudApi<T>) => {
    const handleFetch = function* (action: Action) {
        try {
            const response: ListResponse<T> = yield call(api.list);

            yield put(actions.list.done(response));
        } catch (e) {
            yield put(actions.list.fail(e));
        }
    };

    const handleCreate = function* (action: EntityCreateActionInit<T>) {
        try {
            yield call(api.create, action.entity);

            yield put(actions.create.done());

            history.push(`/admin/${moduleName}`);
        } catch (e) {
            yield put(actions.create.fail(e));
        }
    };

    const handleGet = function* (action: EntityGetActionInit<T>) {
        try {
            const response: T = yield call(api.get, action.id);
            yield put(actions.get.done(response));
        } catch (e) {
            yield put(actions.get.fail(e));
        }
    };

    const handleUpdate = function* (action: EntityUpdateActionInit<T>) {
        try {
            const response: T = yield call(api.update, action.entity);

            yield put(actions.update.done(response));

            history.push(`/admin/${moduleName}`);
        } catch (e) {
            yield put(actions.update.fail(e));
        }
    };

    const handleDelete = function* (action: EntityDeleteActionInit<T>) {
        try {
            yield call(api.delete, action.id);

            yield put(actions.remove.done());
            history.push(`/admin/${moduleName}`);
        } catch (e) {
            yield put(actions.remove.fail(e));
        }
    };

    return function* saga() {
        yield takeLatest(actions.create.init.type, handleCreate);
        yield takeLatest(actions.get.init.type, handleGet);
        yield takeLatest(actions.update.init.type, handleUpdate);
        yield takeLatest(actions.remove.init.type, handleDelete);
        yield takeLatest(actions.list.init.type, handleFetch);
    }
}
