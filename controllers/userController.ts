/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { FastifyReply, FastifyInstance, FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs';
import Mail from 'nodemailer/lib/mailer';
import {
  UserRegisterRequest,
  IUser,
  UserLoginRequest,
  UserAddDeviceRequest,
} from '../interfaces/userInterfaces';
import UserService from '../services/userService';
import serverReply from '../utils/helpers/serverReply';
import { sendMail } from '../utils/nodemailer/config';
import getDevices from '../utils/helpers/getDevices';
import randomCode from '../utils/helpers/randomCode';

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
      const emailLowerCase = email.toLowerCase();
      const user: IUser = {
        username,
        email: emailLowerCase,
        password: bcrypt.hashSync(password, salt),
      };
      const userDB = await service.create(user);
      const payload = { uid: userDB._id, email: userDB.email };
      const tokenJWT = fastify.jwt.sign(payload, {
        expiresIn: '30d',
      });
      const { _id: uid } = userDB;
      return reply.code(serverReply.success.code).send({
        ok: true,
        tokenJWT,
        devices: [],
        uid,
        username,
        email: emailLowerCase,
      });
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
      const user = await service.getByEmail(email.toLowerCase());
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
      const fetchDevices = getDevices(<any>devices);
      const replyUserData = {
        ok: true,
        tokenJWT,
        devices: fetchDevices,
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

  public async addLevelmaticToUser(
    req: UserAddDeviceRequest,
    reply: FastifyReply
  ) {
    try {
      const { uid } = <any>req.user;
      const { idLevelmatic } = <any>req;
      const { devices } = await (<any>(
        service.addLevelmaticToUser(uid, idLevelmatic)
      ));
      if (!devices || devices?.length === 0) {
        return reply.code(400).send({ ok: false, code: 400 });
      }
      const fetchDevices = getDevices(<any>devices);
      return reply.send({ ok: true, devices: fetchDevices });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }

  public async getEspsByUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { uid } = <any>req.user;
      const { devices } = await (<any>service.getEsps(uid));
      const fetchDevices = getDevices(<any>devices);
      return reply.send({ ok: true, devices: fetchDevices });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }

  public async getLevelmaticsByUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { uid } = <any>req.user;
      const { devices: levelmatics } = await (<any>service.getById(uid));
      return reply.send({ ok: true, levelmatics });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }

  public async exist(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { email } = <any>req.body;
      const userExist = await service.getByEmail(email.toLowerCase());
      if (userExist) {
        return reply.code(400).send({
          ok: false,
          message: 'Ya hay un usuario registrado con ese email',
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, message: 'Internal Error' });
    }
  }

  public async update(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, uid } = <any>req.user;
      const { password, newPassword } = <any>req.body;
      if (password === newPassword) {
        return reply.code(serverReply.badRequest.code).send({
          ok: false,
          message: 'La nueva contraseña no debe ser igual a la anterior',
        });
      }
      const user = await service.getByEmail(email);
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return reply
          .code(serverReply.badRequest.code)
          .send({ ok: false, message: 'Contraseña incorrecta' });
      }
      const salt: string = bcrypt.genSaltSync(Number(process.env.SALT));
      const newPasswordEncrypted = bcrypt.hashSync(newPassword, salt);
      await service.update(uid, {
        password: newPasswordEncrypted,
      });
      return reply
        .code(200)
        .send({ ok: true, message: 'La contraseña ha sido actualizada' });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, message: 'Internal Error' });
    }
  }

  public generateNewToken(
    fastify: FastifyInstance,
    req: FastifyRequest,
    reply: FastifyReply
  ) {
    const { email, uid } = <any>req.user;
    const payload = { uid, email };
    const tokenJWT = fastify.jwt.sign(payload, {
      expiresIn: '30d',
    });
    return reply.send({ ok: true, tokenJWT });
  }

  public async forgotPassword(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { email } = <IUser>req.body;
      const user = await (<any>service.getByEmail(email));
      if (!user) {
        return reply.send({
          ok: false,
          message: 'No se encontró ningun usuario con este email',
        });
      }

      user.resetPasswordCode = randomCode();
      user.resetPasswordExpires = Date.now() + 900000;

      const userForgotPass = await user.save();

      const mailOpts: Mail.Options = {
        to: userForgotPass.email,
        from: {
          name: 'Levelmatic',
          address: 'info@levelmatic.net',
        },
        subject: 'Restablecimiento de contraseña de Levelmatic',
        text: `Tu codigo de restablecimiento de contraseña es: \n${userForgotPass.resetPasswordCode} \n\nSi tu no pediste este restablecimiento de contraseña, solamente ignora este email.`,
        html: `
              <p>Tu codigo de restablecimiento de contraseña es:</p>
              <p style="font-size:36px;">${userForgotPass.resetPasswordCode}</p>
              <p>Si tu no pediste este restablecimiento de contraseña, solamente ignora este email.</p>
        `,
      };

      await sendMail(mailOpts);
      return reply.send({
        ok: true,
        message:
          'Se ha enviado el codigo de recuperación de contraseña a su correo',
      });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, message: 'Internal Error' });
    }
  }

  public async resetPassword(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { code } = <{ code: number }>req.params;
      const user = await service.getByPassCode(code);
      if (!user) {
        return reply
          .code(401)
          .send({ ok: false, message: 'El codigo expiró o es invalido' });
      }
      reply.send({ ok: true, code: Number(code) });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, message: 'Internal Error' });
    }
  }

  public async setupNewPassword(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { code } = <{ code: number }>req.params;
      const { newPassword } = <{ newPassword: string }>req.body;
      const user = await (<any>service.getByPassCode(code));
      if (!user) {
        return reply.code(401).send({
          ok: false,
          message: 'El tiempo para cambiar la contraseña expiró',
        });
      }
      const salt: string = bcrypt.genSaltSync(Number(process.env.SALT));
      const newPasswordEncrypted = bcrypt.hashSync(newPassword, salt);

      await service.update(user._id, {
        password: newPasswordEncrypted,
        resetPasswordCode: undefined,
        resetPasswordExpires: undefined,
      });

      return reply.send({
        ok: true,
        message: 'La contraseña ha sido modificada',
      });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, message: 'Internal Error' });
    }
  }
}
