import { Document } from 'mongoose';
import { FastifyRequest } from 'fastify';
import { IESPDoc } from './espInterfaces';
import { ID } from './measureInterfaces';
import { ILevelmaticCred, ILevelmaticID } from './levelmaticInterfaces';

export interface IUser {
  email: string;
  password: string;
  username: string;
  verified: boolean;
  verifiedCode: number | undefined;
  verifiedCodeExpires: Date | number | undefined;
  resetPasswordCode?: number;
  resetPasswordExpires?: Date;
  devices?: ID[] | IESPDoc[];
}
export interface IUserDoc extends Document, IUser {}

export type UserRegisterRequest = FastifyRequest<{
  Body: IUser;
}>;

export interface IUserLogin {
  email: string;
  password: string;
}

export type UserLoginRequest = FastifyRequest<{
  Body: IUserLogin;
}>;

export type UserAddDeviceRequest = FastifyRequest<{
  Body: ILevelmaticCred | ILevelmaticID;
}>;
