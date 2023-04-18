import express from 'express';
import { appRouter } from './routers/app.router.js';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(appRouter);



