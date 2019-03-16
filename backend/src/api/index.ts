import { setup as setupUsers } from './users';
import { setup as setupAuth } from './auth';
import { setup as setupNews } from './news';
import { setup as setupChamps } from './champs';
import { setup as setupStat } from './stat';
import { setup as setupAbout } from './about';
import { setup as setupContacts } from './contacts';
import { Router } from 'express';

export const setup = (router: Router) => {
    router.get('/api/version', async (req, res) => {
        res.send({
            version: require('../../package.json').version
        });
    });
    setupAuth(router);

    setupUsers(router);
    setupNews(router);
    setupChamps(router);
    setupStat(router);

    setupAbout(router);
    setupContacts(router);
};
