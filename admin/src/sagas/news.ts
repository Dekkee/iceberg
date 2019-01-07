import { actions, NewsCreateActionInit, NewsDeleteActionInit, NewsUpdateActionInit } from '../actions/news';
import { put, takeLatest, call } from 'redux-saga/effects';
import { NewsResponse, NewsListResponse } from '../api/contracts';
import { deleteNews, getNews, createNews, updateNews, listNews } from '../api/news';
import { NewsGetActionInit } from '../actions/news';
import { Action } from 'redux';

const handleFetch = function* (action: Action) {
    try {
        const response: NewsListResponse = yield call(listNews);

        yield put(actions.list.done(response));

    } catch (e) {
        yield put(actions.list.fail(e));
    }
};

const handleCreate = function* (action: NewsCreateActionInit) {
    try {
        yield call(createNews, action.user);

        yield put(actions.create.done());

    } catch (e) {
        yield put(actions.create.fail(e));
    }
};

const handleGet = function* (action: NewsGetActionInit) {
    try {
        const response: NewsResponse = yield call(getNews, action.id);
        yield put(actions.get.done(response));

    } catch (e) {
        yield put(actions.get.fail(e));
    }
};

const handleUpdate = function* (action: NewsUpdateActionInit) {
    try {
        const response: NewsResponse = yield call(updateNews, action.user);

        yield put(actions.update.done(response));

    } catch (e) {
        yield put(actions.update.fail(e));
    }
};

const handleDelete = function* (action: NewsDeleteActionInit) {
    try {
        yield call(deleteNews, action.id);

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
