import { FastifyInstance } from 'fastify';
import { userRegisterOpts } from './options/userOptions';
import UserController from '../controllers/userController';
import { IUser } from '../interfaces/userInterfaces';

const userController = UserController.Instance;

const routes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: IUser }>('/', userRegisterOpts, userController.create);
};

module.exports = routes;
