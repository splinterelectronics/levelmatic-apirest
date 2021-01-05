/* eslint-disable no-shadow */
import { FastifyInstance } from 'fastify';
import {
  userRegisterOpts,
  userLoginOpts,
  userAddDeviceOpts,
  userGetDevicesOpts,
  userUpdateOpts,
  userAddDeviceByIdOpts,
  userVerifyCodeOpts,
  userVerifyEmailOpts,
  userResetPassCodeOpts,
  userResetSetNewPassOpts,
} from './options/userOptions';
import UserController from '../controllers/userController';
import { IUser, IUserLogin } from '../interfaces/userInterfaces';
import {
  ILevelmaticCred,
  ILevelmaticID,
} from '../interfaces/levelmaticInterfaces';

const userController = UserController.Instance;

const routes = async (fastify: FastifyInstance) => {
  fastify
    .post<{ Body: IUser }>('/', userRegisterOpts, userController.create)
    .post<{ Body: IUserLogin }>('/login', userLoginOpts, (req, reply) => {
      userController.login(fastify, req, reply);
    })
    .get('/verify/:code', userVerifyCodeOpts, userController.verifyEmailCode)
    .post('/verify', userVerifyEmailOpts, userController.verifyEmail)
    .get('/reset/:code', userResetPassCodeOpts, userController.resetPassword)
    .post(
      '/reset/:code',
      userResetSetNewPassOpts,
      userController.setupNewPassword
    )
    .post('/forgot', userVerifyEmailOpts, userController.forgotPassword)
    .register(async (fastify) => {
      fastify
        .addHook('preValidation', (<any>fastify).authenticate)
        .get('/devices', userGetDevicesOpts, userController.getEspsByUser)
        .get('/levelmatics', userController.getLevelmaticsByUser)
        .get('/renew', (req, reply) => {
          userController.generateNewToken(fastify, req, reply);
        })
        .put('/', userUpdateOpts, userController.update)
        .post<{ Body: ILevelmaticID }>(
          '/device',
          userAddDeviceByIdOpts,
          userController.addLevelmaticToUser
        )
        .put<{ Body: ILevelmaticCred }>(
          '/device',
          userAddDeviceOpts,
          userController.addLevelmaticToUser
        );
    });
};

module.exports = routes;
