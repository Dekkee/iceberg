import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as serve from 'serve-static';
import { setup as setupApi } from './api';
import { setup as setupPassport } from './auth';
import { User } from './schemas/User';
import UserRepository from './schemas/UserRepository';
import { adminUser } from './roles/admin';

const app = express();
const router = express.Router();

app.use(serve('public'));
app.use(morgan(':method :url -> :status'));
app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());

const nodeEnv = process.env.NODE_ENV;

if (nodeEnv !== 'produnction') {
    app.use(cors());
}

app.set('view engine', 'pug');

app.use(passport.initialize());
app.use(router);
app.use(adminUser.middleware());

const server = app.listen(3000);// запускаем сервер на порту 3000

(mongoose.Promise as any) = Promise;
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/iceberg', { useNewUrlParser: true });

const defaultAdmin = {
    email: '1',
    password: '1',
    isAdmin: true,
};

User.findOne({ email: defaultAdmin.email }, (err, user) => {
    if (err) {
        console.error(err);
        return;
    }

    if (!user) {
        new UserRepository().put(defaultAdmin);
    }
});

setupPassport(passport);
setupApi(router);
