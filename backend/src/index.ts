import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as serve from "koa-static";
import * as logger from "koa-logger";
import * as passport from "koa-passport";
import * as mongoose from "mongoose";
import * as crypto from "crypto";

const app = new Koa();
const router = new Router();
app.use(serve('public'));
app.use(logger());
app.use(bodyParser());
app.use(passport.initialize()); // сначала passport
app.use(router.routes()); // потом маршруты

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/iceberg');

const server = app.listen(3000);// запускаем сервер на порту 3000
