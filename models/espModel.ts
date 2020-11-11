import { model, Schema } from 'mongoose';
import { IESP, IESPDoc } from '../interfaces/espInterfaces';

const EspSchemaFields: Record<keyof IESP, any> = {
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  lastMeasure: {
    type: Schema.Types.ObjectId,
    ref: 'Measure',
  },
  name: String,
  rxConnection: Date,
};

const EspSchema = new Schema(EspSchemaFields);

const Esp = model<IESPDoc>('Esp', EspSchema);
export default Esp;
