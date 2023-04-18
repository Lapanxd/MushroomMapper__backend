import express from 'express';
import bodyParser from 'body-parser';
import { mushroomService } from "../services/mushroom.service.js";
import { geoPointService } from '../services/geoPoint.service.js';

export const geoPointRouter = express.Router();

geoPointRouter.get('/', (request, response) => {
  geoPointService.findAll()
    .then(items => response.json(items));
});

geoPointRouter.post('/', (request, response) => {
  const body = request.body;
  const mushroomName = body.mushroomName;
  const lat = body.lat;
  const long = body.long;

  mushroomService.findByName(mushroomName)
  .then(item => geoPointService.create(item._id.toString(), lat, long))
  .then(item => response.json(item));
});
