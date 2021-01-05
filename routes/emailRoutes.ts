import { FastifyInstance } from 'fastify';
import EmailController from '../controllers/emailController';

const emailController = EmailController.Instance;

module.exports = async (fastify: FastifyInstance) => {
  fastify.get('/send', emailController.recoverPassword);
};
