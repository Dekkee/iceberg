import { select } from 'redux-saga/effects';
import { tokenSelector } from '../../admin/src/selectors/auth';
import { checkStatus, resolveUrl } from '../../admin/src/api';
import { ListResponse } from './contracts';

export interface CrudApi<T> {
    list: () => IterableIterator<ListResponse<T>>;
    get: (id: string) => IterableIterator<T>;
    create: (entity: T) => IterableIterator<string>;
    update: (entity: T) => IterableIterator<string>;
    delete: (id: string) => IterableIterator<string>;
}

export const createApi = <T>(name: string): CrudApi<T> => ({
    list: function* () {
        const { token } = yield select(tokenSelector);
        const response = yield fetch(resolveUrl(name), {
            headers: {
                'Authorization': token
            }
        });
        checkStatus(response);
        return yield response.json();
    },

    get: function* (id: string) {
        const { token } = yield select(tokenSelector);
        const response = yield fetch(resolveUrl(`${name}/${ id }`), {
            headers: {
                'Authorization': token
            }
        });
        checkStatus(response);
        return yield response.json();
    },

    create: function* (entity: T) {
        const { token } = yield select(tokenSelector);
        const response = yield fetch(resolveUrl(name), {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entity)
        });
        checkStatus(response);
        return yield response.text();
    },

    update: function* (entity: T) {
        const { token } = yield select(tokenSelector);
        const response = yield fetch(resolveUrl(name), {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entity)
        });
        checkStatus(response);
        return yield response.text();
    },

    delete: function* (id: string) {
        const { token } = yield select(tokenSelector);
        const response = yield fetch(resolveUrl(`${name}/${ id }`), {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });
        checkStatus(response);
        return yield response.text();
    }
});
