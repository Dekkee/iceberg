import { AuthenticationResponse } from './contracts';
import { checkStatus, resolveUrl } from '.';

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
