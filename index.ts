import fastify, { FastifyInstance } from 'fastify';
import dbConnection from './utils/database/config';
import { emailConnection } from './utils/nodemailer/config';

require('./utils/env/config');

dbConnection();
emailConnection();

const server: FastifyInstance = fastify();

server.register(require('fastify-cors'));

server.get('/', async (req, reply) => {
  return reply.send('<h1>Welcome to your simple server!!<h1>');
});

server.register(require('./utils/plugins/fastifyJwt'));

server.register(require('./routes'));

const port = process.env.PORT || 3000;

server.listen(port, '0.0.0.0', (err, address) => {
  if (err) {
    console.log(err);
  }
  console.log('el puerto ess:', port);
  console.log('Corriendo en address:', address);
});
