import express from 'express';
import cors from 'cors';
import { appRouter } from './routers/app.router.js';
import bodyParser from 'body-parser';

export const app = express();

app.use(cors({
  origin: "http://localhost:4200",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(appRouter);



