import { model, Schema } from 'mongoose';
import { IUserDoc, IUser } from '../interfaces/userInterfaces';

const UserSchemaFields: Record<keyof IUser, any> = {
  username: {
    type: String,
    required: false,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Esp',
    },
  ],
};

const UserSchema = new Schema(UserSchemaFields);

UserSchema.methods.toJSON = function dataToReturn() {
  const { password, __v, ...user } = this.toObject();
  return user;
};

const User = model<IUserDoc>('User', UserSchema);
export default User;
