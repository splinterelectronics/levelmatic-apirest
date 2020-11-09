import { FastifyInstance, RouteOptions, RouteShorthandOptions } from 'fastify';
import { userOpts } from './options/userOptions';

const routes = async (fastify: FastifyInstance, options: RouteOptions) => {
  //   fastify.get('/', async (req, reply) => {
  //     return { user: 'myuser' };
  //   });
  fastify.post('/', userOpts, async (req, reply) => {
    return { user: 'myuser' };
  });
};

module.exports = routes;
