import { model, Schema } from 'mongoose';
import { IMeasure, IMeasureDoc } from '../interfaces/measureInterfaces';

const MeasureSchemaFields: Record<keyof IMeasure, any> = {
  idESP: {
    type: Schema.Types.ObjectId,
    ref: 'Esp',
  },
  liquidLevel: {
    type: Number,
  },
  batteryLevel: {
    type: Number,
  },
  dateMeasure: {
    type: Date,
    default: Date.now,
  },
};

const MeasureSchema = new Schema(MeasureSchemaFields);
const Measure = model<IMeasureDoc>('Measure', MeasureSchema);
export default Measure;
