import { FastifyInstance, RouteOptions } from 'fastify';

const routes = async (fastify: FastifyInstance, options: RouteOptions) => {
  fastify.get('/', async (req, reply) => {
    return { hello: 'world' };
  });
  fastify.register(require('./userRoutes'), { prefix: '/user' });
};

module.exports = routes;
