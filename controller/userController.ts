import { FastifyReply } from 'fastify';
import { UserRegisterBodyRequest, IUser } from '../interfaces/userInterfaces';
import { UserService } from '../services/userService';
const service = UserService.Instance;

export class UserController {
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
  public async create(req: UserRegisterBodyRequest, reply: FastifyReply) {
    try {
      const { username, password, email } = req.body;
      const user: IUser = { username, password, email };
      const userDB = await service.create(user);
      return reply.send('parece que está en la bd');
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }
}
