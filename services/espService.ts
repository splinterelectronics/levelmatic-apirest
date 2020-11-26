import { ID } from '../interfaces/measureInterfaces';
import Esp from '../models/espModel';
import { EspDTO } from '../interfaces/espInterfaces';

export default class EspService {
  private static instance: EspService;

  public static get Instance(): EspService {
    if (!EspService.instance) {
      EspService.instance = new EspService();
    }
    return EspService.instance;
  }

  public getById(id: ID) {
    return Esp.findById(id);
  }

  public updateById(id: ID, data: EspDTO) {
    return Esp.findByIdAndUpdate(id, data, { new: true }).populate(
      'lastMeasure'
    );
  }
}
