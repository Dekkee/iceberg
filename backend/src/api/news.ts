import { NewsRepository } from "../schemas/News";
import { Router } from "express";

export const setup = (router: Router) => {
    router.get('/api/news', async (req, res) => {
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

    router.get('/api/news/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const news = await new NewsRepository().get(id);
            if (!news) {
                res.status(404).send(new Error(`News with id ${id} not found`));
                return;
            }
            res.send(news);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
