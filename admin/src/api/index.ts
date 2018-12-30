import { AuthenticationResponse } from './contracts';
import { select } from 'redux-saga/effects';
import { tokenSelector } from '../selectors/auth';

const endPoint = '//localhost:3000/api/admin';
// process.env.API_HOST && process.env.HOST_PORT ?
// `http://${process.env.API_HOST}:${process.env.HOST_PORT}/admin` :
// 'admin';

export function resolveUrl (url: string): string {
    return `${endPoint}/${url}`;
}

const checkStatus = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText);
        (error as any).response = response;
        throw error;
    }
};

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

export const login = async (email: string, password: string): Promise<AuthenticationResponse> => {
    const response = await fetch(resolveUrl('login'), {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
    checkStatus(response);
    return await response.json();
};

export const refresh = async (token: string): Promise<void> => {
    const response = await fetch(resolveUrl('custom'), {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
    checkStatus(response);
};
