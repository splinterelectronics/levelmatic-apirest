import { IUser } from '../interfaces/userInterfaces';
import User from '../models/userModel';
import Esp from '../models/espModel';

export default class UserService {
  private static instance: UserService;

  public static get Instance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public create(user: IUser) {
    return new User(user).save();
  }

  public login(email: string) {
    return User.findOne({ email }).populate({
      path: 'devices',
      populate: { path: 'lastMeasure' },
      schema: Esp,
    });
  }
}
