import { FastifyInstance } from 'fastify';
import { userRegisterOpts } from './options/userOptions';
import { UserController } from '../controller/userController';
const userController = UserController.Instance;

const routes = async (fastify: FastifyInstance) => {
  fastify.post<any>('/', userRegisterOpts, userController.create);
};

module.exports = routes;
