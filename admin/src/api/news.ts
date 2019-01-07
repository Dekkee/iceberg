import { select } from 'redux-saga/effects';
import { tokenSelector } from '../selectors/auth';
import { checkStatus, resolveUrl } from './index';
import { NewsExtended } from '../../../common/contracts/News';

export const listNews = function* () {
    const { token } = yield select(tokenSelector);
    const response = yield fetch(resolveUrl('news'), {
        headers: {
            'Authorization': token
        }
    });
    checkStatus(response);
    return yield response.json();
};

export const getNews = function* (id: string) {
    const { token } = yield select(tokenSelector);
    const response = yield fetch(resolveUrl(`user/${ id }`), {
        headers: {
            'Authorization': token
        }
    });
    checkStatus(response);
    return yield response.json();
};

export const createNews = function* (news: NewsExtended) {
    const { token } = yield select(tokenSelector);
    const response = yield fetch(resolveUrl('news'), {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(news)
    });
    checkStatus(response);
    return yield response.json();
};

export const updateNews = function* (news: NewsExtended) {
    const { token } = yield select(tokenSelector);
    const response = yield fetch(resolveUrl('news'), {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(news)
    });
    checkStatus(response);
    return yield response.json();
};

export const deleteNews = function* (id: string) {
    const { token } = yield select(tokenSelector);
    const response = yield fetch(resolveUrl(`user/${ id }`), {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    });
    checkStatus(response);
    return yield response.json();
};
