import UserRepository from "../schemas/UserRepository";
import { ACCESS_ADMIN_PAGES, adminUser } from "../roles/admin";
import { Router } from "express";
import * as passport from 'passport';

export const setup = (router: Router) => {
    router.use('/api/admin/user', passport.authenticate('jwt'), adminUser.can(ACCESS_ADMIN_PAGES));

    router.get('/api/admin/user', async (req, res) => {
        try {
            const rep = new UserRepository();
            res.send({
                result: await rep.list(req.query),
                count: await rep.count(req.query),
            });
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.get('/api/admin/user/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const user = await new UserRepository().get(id);
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

    router.post('/api/admin/user', async (req, res) => {
        try {
            await new UserRepository().put(req.body);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.put('/api/admin/user', async (req, res) => {
        try {
            await new UserRepository().update(req.body);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.delete('/api/admin/user/:id', async (req, res) => {
        try {
            await new UserRepository().delete(req.params.id);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
