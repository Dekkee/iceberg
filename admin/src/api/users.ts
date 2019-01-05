import { select } from 'redux-saga/effects';
import { tokenSelector } from '../selectors/auth';
import { checkStatus, resolveUrl } from './index';

export const getUsers = function* () {
    const { token } = yield select(tokenSelector);
    const response = yield fetch(resolveUrl('user'), {
        headers: {
            'Authorization': token
        }
    });
    checkStatus(response);
    return yield response.json();
};
