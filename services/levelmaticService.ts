import { ID, ILevelmaticCred } from '../interfaces/levelmaticInterfaces';
import Levelmatic from '../models/levelmaticModel';

export default class LevelmaticService {
  private static instance: LevelmaticService;

  public static get Instance(): LevelmaticService {
    if (!LevelmaticService.instance) {
      LevelmaticService.instance = new LevelmaticService();
    }
    return LevelmaticService.instance;
  }

  public getLevelmaticById(id: ID) {
    return Levelmatic.findById(id);
  }

  public getLevelmaticByCredentials(credentials: ILevelmaticCred) {
    return Levelmatic.findOne(credentials);
  }
}
