import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { jwtsecret } from '../auth/secret';
import { Router } from 'express';

export const setup = (router: Router) => {
    router.post('/api/admin/login', passport.authenticate('local'), (req, res) => {
        if (req.user == false) {
            res.send('Login failed');
        } else {
            const payload = {
                id: req.user.id,
                displayName: req.user.displayName,
                email: req.user.email
            };
            const token = jwt.sign(payload, jwtsecret);

            res.send({ user: req.user.displayName, token: 'Bearer ' + token });
        }
    });

    router.get('/api/admin/custom', passport.authenticate('jwt'), (req, res) => {
        if (req.user) {
            res.send(`hello ${req.user.displayName}`);
        } else {
            res.send('No such user');
        }
    });
};
