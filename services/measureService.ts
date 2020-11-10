import Measure from '../models/measureModel';
import { ID } from '../interfaces/measureInterfaces';

export default class MeasureService {
  private static instance: MeasureService;

  public static get Instance(): MeasureService {
    if (!MeasureService.instance) {
      MeasureService.instance = new MeasureService();
    }
    return MeasureService.instance;
  }

  public getByEspId(idESP: ID | string) {
    return Measure.find({ idESP });
  }
}
