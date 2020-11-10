import { FastifyInstance } from 'fastify';
import MeasureController from '../controllers/measureController';
import { MeasureReadQuery } from '../interfaces/measureInterfaces';
import { measureReadOpts } from './options/measureOptions';

const measureController = MeasureController.Instance;

const routes = async (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: MeasureReadQuery }>(
    '/',
    measureReadOpts,
    measureController.read
  );
};

module.exports = routes;
