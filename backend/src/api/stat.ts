import { StatRepository } from "../schemas/Stat";
import { ACCESS_ADMIN_PAGES, adminUser } from "../roles/admin";
import { Router } from "express";
import * as passport from 'passport';

export const setup = (router: Router) => {
    router.use('/api/admin/stat', passport.authenticate('jwt'), adminUser.can(ACCESS_ADMIN_PAGES));

    router.get('/api/admin/stat', async (req, res) => {
        try {
            const rep = new StatRepository();
            res.send({
                result: await rep.list(req.query),
                count: await rep.count(req.query),
            });
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.get('/api/admin/stat/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await new StatRepository().get(id);
            if (!entity) {
                res.status(404).send(new Error(`Stat with id ${id} not found`));
                return;
            }
            res.send(entity);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.post('/api/admin/stat', async (req, res) => {
        try {
            // HACK: depopulate player
            const entity = req.body;
            entity.player = entity.player.id || entity.player;
            await new StatRepository().create(entity);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.put('/api/admin/stat', async (req, res) => {
        try {
            // HACK: depopulate player
            const entity = req.body;
            entity.player = entity.player.id || entity.player;
            await new StatRepository().update(entity);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.delete('/api/admin/stat/:id', async (req, res) => {
        try {
            await new StatRepository().delete(req.params.id);
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
