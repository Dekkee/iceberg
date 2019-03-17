import { setup as setupAuth } from './auth';

import { setup as setupAdminUsers } from './admin/users';
import { setup as setupAdminNews } from './admin/news';
import { setup as setupAdminChamps } from './admin/champ';
import { setup as setupAdminStat } from './admin/stat';
import { setup as setupAdminAbout } from './admin/about';
import { setup as setupAdminContacts } from './admin/contacts';

import { setup as setupCommonNews } from './news';
import { setup as setupCommonChamps } from './champ';
import { setup as setupCommonCrew } from './crew';
import { setup as setupCommonAbout } from './about';
import { setup as setupCommonContacts } from './contacts';

import { Router } from 'express';

export const setup = (router: Router) => {
    router.get('/api/version', async (req, res) => {
        res.send({
            version: require('../../package.json').version
        });
    });
    setupAuth(router);

    // common
    setupCommonNews(router);
    setupCommonChamps(router);
    setupCommonCrew(router);

    setupCommonAbout(router);
    setupCommonContacts(router);

    // admin
    setupAdminUsers(router);
    setupAdminNews(router);
    setupAdminChamps(router);
    setupAdminStat(router);

    setupAdminAbout(router);
    setupAdminContacts(router);
};
