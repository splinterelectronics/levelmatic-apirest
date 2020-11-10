import { Document } from 'mongoose';
import { FastifyRequest } from 'fastify';

export interface IUser {
  email: string;
  password: string;
  username: string;
}

export interface IUserDoc extends Document, IUser {}

export type UserRegisterRequest = FastifyRequest<{
  Body: IUser;
}>;
