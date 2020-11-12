import fp from 'fastify-plugin';
import { FastifyRequest, FastifyReply } from 'fastify';
import fastifyJWT, { FastifyJWTOptions } from 'fastify-jwt';

const jwtOptions: FastifyJWTOptions = {
  secret: 'testing',
};

module.exports = fp(async (fastify) => {
  fastify.register(fastifyJWT, jwtOptions);

  fastify.decorate(
    'authenticate',
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
});
