import { FastifyInstance } from 'fastify';

const routes = async (fastify: FastifyInstance) => {
  // fastify.get('/', async (req, reply) => {
  //   return { hello: 'world' };
  // });
  fastify.register(require('./userRoutes'), { prefix: '/user' });
};

module.exports = routes;
