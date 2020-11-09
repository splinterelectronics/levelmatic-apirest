import fastify, { FastifyInstance } from 'fastify';
require('./env/config');

const server: FastifyInstance = fastify();

server.register(require('./routes'));

server.listen(process.env.PORT, (err, address) => {
  if (err) {
    console.log(err);
  }
  console.log('Corriendo en address:', address);
});
