import * as express from 'express';
import * as morgan from 'morgan';
import * as colors from 'colors';
import * as cors from 'cors';
const compression = require('compression');

const app = express()
    .use(morgan(':method :url -> :status'))
    .use(cors());

app.use(compression({ threshold: 0 }));
app.use(express.static('dist'));

app.get('*', function (req, resp) {
    resp.status(404).send({
        message: 'NOT_FOUND',
        method: req.method,
        url: req.url
    });
});

const port = 8082;

app.listen(port, function () {
    console.log(colors.cyan(`Iceberg server is running at http://localhost:${port}`));
});
