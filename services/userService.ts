import { IUser } from '../interfaces/userInterfaces';
import User from '../models/userModel';
import { ID } from '../interfaces/measureInterfaces';
import Levelmatic from '../models/levelmaticModel';

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

  public getByEmail(email: string) {
    return User.findOne({ email }).populate({
      path: 'devices',
      populate: { path: 'devicesESP', populate: { path: 'lastMeasure' } },
      schema: Levelmatic,
    });
  }

  public getById(id: ID) {
    return User.findById(id);
  }

  public addLevelmaticToUser(uid: ID, idLevelmatic: ID) {
    return User.findByIdAndUpdate(
      uid,
      { $addToSet: { devices: idLevelmatic } },
      { new: true, runValidators: true }
    ).populate({
      path: 'devices',
      populate: { path: 'devicesESP', populate: { path: 'lastMeasure' } },
      schema: Levelmatic,
    });
  }

  public getEsps(uid: ID) {
    return User.findById(uid).populate({
      path: 'devices',
      populate: { path: 'devicesESP', populate: { path: 'lastMeasure' } },
      schema: Levelmatic,
    });
  }

  public update(uid: ID, toUpdate: {}) {
    return User.findByIdAndUpdate(uid, toUpdate, {
      new: true,
      runValidators: true,
    });
  }
}
