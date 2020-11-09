import { model, Schema } from 'mongoose';
import { IUserDoc, IUser } from '../interfaces/userInterfaces';

// Se coloca keyof IUser para que el Schema de mongoose sepa las propiedades que debe contener
const UserSchemaFields: Record<keyof IUser, any> = {
  username: {
    type: String,
    required: true,
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
};

const UserSchema = new Schema(UserSchemaFields);
const User = model<IUserDoc>('User', UserSchema);
export default User;
