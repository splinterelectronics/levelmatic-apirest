import fastify, { FastifyInstance } from 'fastify';
import dbConnection from './utils/database/config';
require('./env/config');

dbConnection();

const server: FastifyInstance = fastify();

server.register(require('./routes'));

server.listen(process.env.PORT, (err, address) => {
  if (err) {
    console.log(err);
  }
  console.log('Corriendo en address:', address);
});
