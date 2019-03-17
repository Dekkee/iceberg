import { Router } from "express";

export const setup = (router: Router) => {
    router.get('/api/crew', async (req, res) => {
        try {
            // todo: stub
            res.send({
                result: [],
                count: 0,
            });
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

    router.get('/api/crew/:id', async (req, res) => {
        try {
            const id = req.params.id;
            // todo: stub
            if (true) {
                res.status(404).send(new Error(`Player with id ${id} not found`));
                return;
            }
            // res.send(user);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
