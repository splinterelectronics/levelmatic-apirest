import { IUser } from '../interfaces/userInterfaces';
import User from '../models/userModel';

// https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc

export default class UserService {
  private static instance: UserService;

  public static get Instance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async create(user: IUser) {
    try {
      return await new User(user).save();
    } catch (error) {
      return error;
    }
  }
}
