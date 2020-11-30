import { model, Schema } from 'mongoose';
import {
  ILevelmatic,
  ILevelmaticDoc,
} from '../interfaces/levelmaticInterfaces';

const LevelmaticSchemaFields: Record<keyof ILevelmatic, any> = {
  devicesESP: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Esp',
    },
  ],
};

const LevelmaticSchema = new Schema(LevelmaticSchemaFields);

const Levelmatic = model<ILevelmaticDoc>('Levelmatic', LevelmaticSchema);
export default Levelmatic;
