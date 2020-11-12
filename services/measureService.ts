import Measure from '../models/measureModel';
import { ID } from '../interfaces/measureInterfaces';
import getRangeDate from '../utils/helpers/getRangeDate';

export default class MeasureService {
  private static instance: MeasureService;

  public static get Instance(): MeasureService {
    if (!MeasureService.instance) {
      MeasureService.instance = new MeasureService();
    }
    return MeasureService.instance;
  }

  public getByEspId(idESP: ID | string, range: string) {
    const { from, to } = getRangeDate(range);
    return Measure.find({
      idESP,
      dateMeasure: {
        $gte: from.toDate(),
        $lte: to.toDate(),
      },
    });
  }
}
