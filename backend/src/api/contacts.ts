import { Contacts } from "../schemas/Contacts";
import { ACCESS_ADMIN_PAGES, adminUser } from "../roles/admin";
import { Router } from "express";
import * as passport from 'passport';

export const setup = (router: Router) => {
    router.use('/api/admin/contacts', passport.authenticate('jwt'), adminUser.can(ACCESS_ADMIN_PAGES));

    router.get('/api/admin/contacts', async (req, res) => {
        try {
            const about = await Contacts.findOne();
            res.send(about || {});
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.post('/api/admin/contacts', async (req, res) => {
        try {
            await Contacts.findOneAndUpdate({}, req.body, { upsert: true });
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
