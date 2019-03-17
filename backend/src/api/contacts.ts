import { About } from "../schemas/About";
import { Router } from "express";
import * as passport from 'passport';

export const setup = (router: Router) => {
    router.get('/api/contacts', async (req, res) => {
        try {
            const about = await About.findOne();
            res.send(about || {});
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
