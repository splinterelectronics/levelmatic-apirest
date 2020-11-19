/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { FastifyReply, FastifyInstance, FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import {
  UserRegisterRequest,
  IUser,
  UserLoginRequest,
  UserAddDeviceRequest,
} from '../interfaces/userInterfaces';
import UserService from '../services/userService';
import serverReply from '../utils/helpers/serverReply';

const service = UserService.Instance;

export default class UserController {
  private static instance: UserController;

  public static get Instance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  public async create(
    fastify: FastifyInstance,
    req: UserRegisterRequest,
    reply: FastifyReply
  ) {
    try {
      const { username, password, email } = req.body;
      const salt: string = bcrypt.genSaltSync(Number(process.env.SALT));
      const user: IUser = {
        username,
        email,
        password: bcrypt.hashSync(password, salt),
      };
      const userDB = await service.create(user);
      const payload = { uid: userDB._id, email: userDB.email };
      const tokenJWT = fastify.jwt.sign(payload, {
        expiresIn: '30d',
      });
      const { _id: uid } = userDB;
      return reply
        .code(serverReply.success.code)
        .send({ ok: true, tokenJWT, devices: [], uid, username, email });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }

  public async login(
    fastify: FastifyInstance,
    req: UserLoginRequest,
    reply: FastifyReply
  ) {
    try {
      const { email, password } = req.body;
      const user = await service.getByEmail(email);
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return reply
          .code(serverReply.badRequest.code)
          .send({ ok: false, message: 'credenciales incorrectas' });
      }
      const payload = { uid: user._id, email: user.email };
      const tokenJWT = fastify.jwt.sign(payload, {
        expiresIn: '30d',
      });
      const { devices, _id: uid, username } = user;
      const replyUserData = {
        ok: true,
        tokenJWT,
        devices,
        uid,
        username,
        email,
      };
      return reply.code(serverReply.success.code).send(replyUserData);
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }

  public async addEspToUser(req: UserAddDeviceRequest, reply: FastifyReply) {
    try {
      const { uid } = <any>req.user;
      const { idESP } = req.body;
      const user = await service.addEspToUser(uid, idESP);
      const devices = user?.devices;
      if (!devices || devices?.length === 0) {
        return reply.send({ ok: false, code: 400 });
      }
      return reply.send({ ok: true, devices });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }

  public async getEspsByUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { uid } = <any>req.user;
      const { devices } = await (<any>service.getEsps(uid));
      return reply.send({ ok: true, devices });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }

  public async exist(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { email } = <any>req.body;
      const userExist = await service.getByEmail(email);
      if (userExist) {
        return reply.code(400).send({
          ok: false,
          message: 'Ya hay un usuario registrado con ese email',
        });
      }
      return;
    } catch (error) {
      console.log(error);
      return reply.send(500).send({ ok: false, message: 'Internal Error' });
    }
  }
}
