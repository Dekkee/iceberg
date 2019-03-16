import { About } from "../schemas/About";
import { ACCESS_ADMIN_PAGES, adminUser } from "../roles/admin";
import { Router } from "express";
import * as passport from 'passport';

export const setup = (router: Router) => {
    router.use('/api/admin/champ', passport.authenticate('jwt'), adminUser.can(ACCESS_ADMIN_PAGES));

    router.get('/api/admin/about', async (req, res) => {
        try {
            const about = await About.findOne();
            res.send(about || {});
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.post('/api/admin/champ', async (req, res) => {
        try {
            await About.findOneAndUpdate({}, req.body, { upsert: true });
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
