import express from 'express';
import { mushroomRouter } from './mushroom.router.js';
import { geoPointRouter} from './getPoint.router.js';

export const appRouter = express.Router();

appRouter.use('/mushrooms', mushroomRouter);
appRouter.use('/geopoints', geoPointRouter)