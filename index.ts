import fastify, { FastifyInstance } from 'fastify';
import dbConnection from './utils/database/config';

require('./utils/env/config');

// dbConnection();

const server: FastifyInstance = fastify();

server.register(require('fastify-cors'));

server.get('/', async (req, reply) => {
  return reply.send('<h1>Welcome to your simple server!!<h1>');
});
server.register(require('./utils/plugins/fastifyJwt'));
server.register(require('./routes'));

const port = process.env.PORT || 8080;

server.listen(port, (err, address) => {
  if (err) {
    console.log(err);
  }
  console.log('Corriendo en address:', address);
});
