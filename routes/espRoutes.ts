import { FastifyInstance } from 'fastify';
import EspController from '../controllers/espController';
import { espUpdateOpts } from './options/espOptions';
import { EspUpdateBody } from '../interfaces/espInterfaces';

const espController = EspController.Instance;

const routes = async (fastify: FastifyInstance) => {
  fastify.register(async (fastify) => {
    fastify
      .addHook('preValidation', (<any>fastify).authenticate)
      .put<{ Body: EspUpdateBody }>('/', espUpdateOpts, espController.update);
  });
};

module.exports = routes;
