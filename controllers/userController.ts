import { FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import { UserRegisterRequest, IUser } from '../interfaces/userInterfaces';
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

  /**
   * create
   */
  public async create(req: UserRegisterRequest, reply: FastifyReply) {
    try {
      const { username, password, email } = req.body;
      const salt: string = bcrypt.genSaltSync(Number(process.env.SALT));
      const user: IUser = {
        username,
        email,
        password: bcrypt.hashSync(password, salt),
      };
      const userDB = await service.create(user);
      return reply.code(serverReply.created.code).send(userDB);
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }
}
