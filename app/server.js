import express from 'express'
import compression from 'compression';
import contentfulApi from './middleware/contentful-api';
import render from './middleware/render';
import favicon from 'express-favicon';

const app = express();

app.use(compression());
app.use(favicon(`${__dirname}/favicon.ico`));
app.use('/static', express.static(`${__dirname}/../static`));
app.use('/api', contentfulApi);
app.use(render);

app.listen(process.env.PORT || 3000);
console.log('App started on port: 3000');