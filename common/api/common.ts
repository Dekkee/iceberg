import { select } from 'redux-saga/effects';
import { tokenSelector } from '../selectors/auth';
import { checkStatus, resolveUrl } from '.';
import { ListResponse } from './contracts';

export interface CrudApi<T> {
    list: () => IterableIterator<ListResponse<T>>;
    get: (id: string) => IterableIterator<T>;
    create: (entity: T) => IterableIterator<string>;
    update: (entity: T) => IterableIterator<string>;
    delete: (id: string) => IterableIterator<string>;
}

export interface GetListApi<T> {
    list: () => IterableIterator<ListResponse<T>>;
    get: (id: string) => IterableIterator<T>;
}

export const createCrudListApi = <T> (type: string, name: string): CrudApi<T> => ({
    list: function* () {
        const { token } = yield select(tokenSelector);
        const response = yield fetch(resolveUrl(name, type), {
            headers: {
                'Authorization': token
            }
        });
        checkStatus(response);
        return yield response.json();
    },

    get: function* (id: string) {
        const { token } = yield select(tokenSelector);
        const response = yield fetch(resolveUrl(`${name}/${ id }`, type), {
            headers: {
                'Authorization': token
            }
        });
        checkStatus(response);
        return yield response.json();
    },

    create: function* (entity: T) {
        const { token } = yield select(tokenSelector);
        const response = yield fetch(resolveUrl(name, type), {
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
        const response = yield fetch(resolveUrl(name, type), {
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
        const response = yield fetch(resolveUrl(`${name}/${ id }`, type), {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });
        checkStatus(response);
        return yield response.text();
    }
});

export const createPublicGetListApi = <T> (type: string, name: string): GetListApi<T> => ({
    list: function* () {
        const response = yield fetch(resolveUrl(name, type));
        checkStatus(response);
        return yield response.json();
    },

    get: function* (id: string) {
        const response = yield fetch(resolveUrl(`${name}/${ id }`, type));
        checkStatus(response);
        return yield response.json();
    },
});
