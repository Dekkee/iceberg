import { setup as setupUsers } from './users';
import { setup as setupAuth } from './auth';
import { setup as setupNews } from './news';
import { Router } from 'express';

export const setup = (router: Router) => {
    router.get('/api/version', async (req, res) => {
        res.send({
            version: require('../../package.json').version
        });
    });
    setupUsers(router);
    setupAuth(router);
    setupNews(router);
};
