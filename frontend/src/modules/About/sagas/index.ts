import { api } from '../api';
import { actions } from '../actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    EntityGetActionInit,
} from '../../../../../common/actions/common';
import { AboutExtended } from '../../../../../common/contracts/About';

export const saga = function* saga() {
    yield takeLatest(actions.get.init.type, handleGet);
};

const handleGet = function* (action: EntityGetActionInit<AboutExtended>) {
    try {
        const response: AboutExtended = yield call(api.get, action.id);
        yield put(actions.get.done(response));
    } catch (e) {
        yield put(actions.get.fail(e));
    }
};
