import { ChampRepository } from "../schemas/Champ";
import { ACCESS_ADMIN_PAGES, adminUser } from "../roles/admin";
import { Router } from "express";
import * as passport from 'passport';

export const setup = (router: Router) => {
    router.use('/api/admin/champ', passport.authenticate('jwt'), adminUser.can(ACCESS_ADMIN_PAGES));

    router.get('/api/admin/champ', async (req, res) => {
        try {
            const rep = new ChampRepository();
            res.send({
                result: await rep.list(req.query),
                count: await rep.count(req.query),
            });
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.get('/api/admin/champ/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const user = await new ChampRepository().get(id);
            if (!user) {
                res.status(404).send(new Error(`Champ with id ${id} not found`));
                return;
            }
            res.send(user);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.post('/api/admin/champ', async (req, res) => {
        try {
            await new ChampRepository().create(req.body);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.put('/api/admin/champ', async (req, res) => {
        try {
            await new ChampRepository().update(req.body);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.delete('/api/admin/champ/:id', async (req, res) => {
        try {
            await new ChampRepository().delete(req.params.id);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
