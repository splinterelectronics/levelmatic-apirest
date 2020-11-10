import { FastifyInstance } from 'fastify';
import MeasureController from '../controllers/measureController';
import { measureReadOpts } from './options/measureOptions';

const measureController = MeasureController.Instance;

const routes = async (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: { idESP: string } }>(
    '/',
    measureReadOpts,
    measureController.read
  );
};

module.exports = routes;
