import { StatRepository } from "../schemas/Stat";
import { Router } from "express";

export const setup = (router: Router) => {
    router.get('/api/stat', async (req, res) => {
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

    router.get('/api/stat/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const stat = await new StatRepository().get(id);
            if (!stat) {
                res.status(404).send(new Error(`Stat with id ${id} not found`));
                return;
            }
            res.send(stat);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
