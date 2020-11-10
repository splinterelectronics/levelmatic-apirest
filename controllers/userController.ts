import { FastifyReply } from 'fastify';
import { UserRegisterRequest, IUser } from '../interfaces/userInterfaces';
import UserService from '../services/userService';

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
      const user: IUser = { username, password, email };
      const userDB = await service.create(user);
      console.log(userDB);
      return reply.send('parece que está en la bd');
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }
}
