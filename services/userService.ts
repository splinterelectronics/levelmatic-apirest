import { IUser } from '../interfaces/userInterfaces';
import User from '../models/userModel';

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
}
