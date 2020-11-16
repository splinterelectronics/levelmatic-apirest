import fastify, { FastifyInstance } from 'fastify';
import dbConnection from './utils/database/config';

require('./utils/env/config');

dbConnection();

const server: FastifyInstance = fastify();

server.register(require('fastify-cors'));

server.get('/', async (req, reply) => {
  return { hello: 'world' };
});
server.register(require('./utils/plugins/fastifyJwt'));
server.register(require('./routes'));

server.listen(process.env.PORT, (err, address) => {
  if (err) {
    console.log(err);
  }
  console.log('Corriendo en address:', address);
});
