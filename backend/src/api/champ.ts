import { ChampRepository } from "../schemas/Champ";
import { Router } from "express";

export const setup = (router: Router) => {
    router.get('/api/champ', async (req, res) => {
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

    router.get('/api/champ/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const champ = await new ChampRepository().get(id);
            if (!champ) {
                res.status(404).send(new Error(`Champ with id ${id} not found`));
                return;
            }
            res.send(champ);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
