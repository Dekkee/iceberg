import { select } from 'redux-saga/effects';
import { tokenSelector } from '../selectors/auth';
import { checkStatus, resolveUrl } from './index';
import { User } from '../../../common/contracts/User';

export const listUsers = function* () {
    const { token } = yield select(tokenSelector);
    const response = yield fetch(resolveUrl('user'), {
        headers: {
            'Authorization': token
        }
    });
    checkStatus(response);
    return yield response.json();
};

export const getUser = function* (id: string) {
    const { token } = yield select(tokenSelector);
    const response = yield fetch(resolveUrl(`user/${ id }`), {
        headers: {
            'Authorization': token
        }
    });
    checkStatus(response);
    return yield response.json();
};

export const createUser = function* (user: User) {
    const { token } = yield select(tokenSelector);
    const response = yield fetch(resolveUrl('user'), {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    checkStatus(response);
    return yield response.json();
};

export const updateUser = function* (user: User) {
    const { token } = yield select(tokenSelector);
    const response = yield fetch(resolveUrl('user'), {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    checkStatus(response);
    return yield response.json();
};

export const deleteUser = function* (id: string) {
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
