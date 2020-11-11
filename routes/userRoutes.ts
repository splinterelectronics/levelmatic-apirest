import { FastifyInstance } from 'fastify';
import { userRegisterOpts, userLoginOpts } from './options/userOptions';
import UserController from '../controllers/userController';
import { IUser, IUserLogin } from '../interfaces/userInterfaces';

const userController = UserController.Instance;

const routes = async (fastify: FastifyInstance) => {
  fastify
    .post<{ Body: IUser }>('/', userRegisterOpts, userController.create)
    .post<{ Body: IUserLogin }>('/login', userLoginOpts, userController.login);
};

module.exports = routes;
