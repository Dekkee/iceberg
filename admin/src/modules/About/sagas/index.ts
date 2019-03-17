import { api } from '../api';
import { actions } from '../actions';
import { moduleName } from '../index';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    EntityGetActionInit,
    EntityUpdateActionInit
} from '../../../../../common/actions/common';
import { history } from '../../../../../common/history';
import { AboutExtended } from '../../../../../common/contracts/About';

export const saga = function* saga() {
    yield takeLatest(actions.get.init.type, handleGet);
    yield takeLatest(actions.update.init.type, handleUpdate);
};

const handleGet = function* (action: EntityGetActionInit<AboutExtended>) {
    try {
        const response: AboutExtended = yield call(api.get, action.id);
        yield put(actions.get.done(response));
    } catch (e) {
        yield put(actions.get.fail(e));
    }
};

const handleUpdate = function* (action: EntityUpdateActionInit<AboutExtended>) {
    try {
        yield call(api.update, action.entity);

        yield put(actions.update.done());

        history.push(`/admin/${moduleName}`);
    } catch (e) {
        yield put(actions.update.fail(e));
    }
};
