import express from 'express';
import { mushroomService } from "../services/mushroom.service.js";

export const mushroomRouter = express.Router();

mushroomRouter.get('/', (request, response) => {
  mushroomService.findAll()
    .then(items => response.json(items));
});

mushroomRouter.get('/:name', (request, response) => {
  const name = request.params.name;
  mushroomService.findByName(name)
  .then(item => response.json(item));
});