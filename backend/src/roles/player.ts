import * as Roles from 'connect-roles';

export const ACCESS_PLAYER_PAGES = 'access player pages';

export const adminUser = new Roles({
    async failureHandler (req, res, action) {
        // optional function to customise code that runs when
        // user fails authorization
        res.status(403);
        switch (req.accepts('json', 'html')) {
            case 'json':
                res.send({ message: `Access Denied - You don\'t have permission to: ${action}` });
                break;
            case 'html':
                res.render('access-denied', { message: `Access Denied - You don\'t have permission to: ${action}` });
                break;
            default:
                res.send(`Access Denied - You don\'t have permission to: ${action}`);
        }
    }
});

adminUser.use(ACCESS_PLAYER_PAGES, (req, res) => req.isAuthenticated() && req.user);
