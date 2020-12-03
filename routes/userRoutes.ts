/* eslint-disable no-shadow */
import { FastifyInstance } from 'fastify';
import {
  userRegisterOpts,
  userLoginOpts,
  userAddDeviceOpts,
  userGetDevicesOpts,
  userUpdateOpts,
} from './options/userOptions';
import UserController from '../controllers/userController';
import { IUser, IUserLogin } from '../interfaces/userInterfaces';
import { ILevelmaticCred } from '../interfaces/levelmaticInterfaces';

const userController = UserController.Instance;

const routes = async (fastify: FastifyInstance) => {
  fastify
    .post<{ Body: IUser }>('/', userRegisterOpts, (req, reply) => {
      userController.create(fastify, req, reply);
    })
    .post<{ Body: IUserLogin }>('/login', userLoginOpts, (req, reply) => {
      userController.login(fastify, req, reply);
    })
    .register(async (fastify) => {
      fastify
        .addHook('preValidation', (<any>fastify).authenticate)
        .get('/devices', userGetDevicesOpts, userController.getEspsByUser)
        .get('/renew', (req, reply) => {
          userController.generateNewToken(fastify, req, reply);
        })
        .put('/', userUpdateOpts, userController.update)
        .put<{ Body: ILevelmaticCred }>(
          '/device',
          userAddDeviceOpts,
          userController.addLevelmaticToUser
        );
    });
};

module.exports = routes;
