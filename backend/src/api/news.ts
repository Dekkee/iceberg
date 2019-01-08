import NewsRepository from "../schemas/NewsRepository";
import { ACCESS_ADMIN_PAGES, adminUser } from "../roles/admin";
import { Router } from "express";
import * as passport from 'passport';

export const setup = (router: Router) => {
    router.use('/api/admin/news', passport.authenticate('jwt'), adminUser.can(ACCESS_ADMIN_PAGES));

    router.get('/api/admin/news', async (req, res) => {
        try {
            const rep = new NewsRepository();
            res.send({
                result: await rep.list(req.query),
                count: await rep.count(req.query),
            });
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.get('/api/admin/news/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const user = await new NewsRepository().get(id);
            if (!user) {
                res.status(404).send(new Error(`User with id ${id} not found`));
                return;
            }
            res.send(user);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.post('/api/admin/news', async (req, res) => {
        try {
            await new NewsRepository().create(req.body);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.put('/api/admin/news', async (req, res) => {
        try {
            await new NewsRepository().update(req.body);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.delete('/api/admin/news/:id', async (req, res) => {
        try {
            await new NewsRepository().delete(req.params.id);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
