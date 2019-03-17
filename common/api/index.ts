const endPoint = '//localhost:3000/api';
// process.env.API_HOST && process.env.HOST_PORT ?
// `http://${process.env.API_HOST}:${process.env.HOST_PORT}/admin` :
// 'admin';

export function resolveUrl (url: string, type?: string): string {
    return `${endPoint}${type ? `/${type}` : ''}/${url}`;
}

export const checkStatus = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText);
        (error as any).response = response;
        throw error;
    }
};

