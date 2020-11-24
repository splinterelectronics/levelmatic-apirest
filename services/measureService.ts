import { Types } from 'mongoose';
import Measure from '../models/measureModel';
import { ID } from '../interfaces/measureInterfaces';
import getRangeDate from '../utils/helpers/getRangeDate';
import {
  getProjectObject,
  getGroupObject,
  getSortObject,
} from '../utils/helpers/measureAggregateByRange';

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
    const dateMeasure = { $gte: from.toDate(), $lte: to.toDate() };
    if (range === '1h') {
      return Measure.find({
        idESP,
        dateMeasure,
      }).sort({ dateMeasure: 'asc' });
    }
    return Measure.aggregate([
      {
        $match: {
          idESP: Types.ObjectId(<string>idESP),
          dateMeasure,
        },
      },
    ])
      .project(getProjectObject(range))
      .group(getGroupObject(range))
      .sort(getSortObject(range));
  }
}
