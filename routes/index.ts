import { FastifyInstance } from 'fastify';

const routes = async (fastify: FastifyInstance) => {
  fastify
    .register(require('./userRoutes'), { prefix: '/user' })
    .register(require('./measureRoutes'), { prefix: '/measure' })
    .register(require('./espRoutes'), { prefix: '/esp' })
    .register(require('./emailRoutes'), { prefix: '/email' });
};

module.exports = routes;
