import { setup as setupUsers } from './users';
import { setup as setupAuth } from './auth';
import { setup as setupNews } from './news';
import { setup as setupChamps } from './champs';
import { setup as setupStat } from './stat';
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
    setupChamps(router);
    setupStat(router);
};
