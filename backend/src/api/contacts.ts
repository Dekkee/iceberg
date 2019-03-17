import { Contacts } from "../schemas/Contacts";
import { Router } from "express";

export const setup = (router: Router) => {
    router.get('/api/contacts', async (req, res) => {
        try {
            const about = await Contacts.findOne();
            res.send(about || {});
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
};
