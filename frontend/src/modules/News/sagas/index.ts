import { api } from '../api';
import { actions } from '../actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    EntityGetActionInit, EntityListActionInit,
} from '../../../../../common/actions/common';
import { News } from '../../../../../common/contracts/News';
import { ListResponse } from '../../../../../common/api/contracts';

export const saga = function* saga() {
    yield takeLatest(actions.get.init.type, handleGet);
    yield takeLatest(actions.list.init.type, handleFetch);
};

const handleGet = function* (action: EntityGetActionInit<News>) {
    try {
        const response: News = yield call(api.get, action.id);
        yield put(actions.get.done(response));
    } catch (e) {
        yield put(actions.get.fail(e));
    }
};

const handleFetch = function* (action: EntityListActionInit<News>) {
    try {
        const response: ListResponse<News> = yield call(api.list);
        yield put(actions.list.done(response));
    } catch (e) {
        yield put(actions.list.fail(e));
    }
};
