import { Document } from 'mongoose';
import { FastifyRequest } from 'fastify';
import { ID, IMeasureDoc } from './measureInterfaces';
import { IUserDoc } from './userInterfaces';

export interface IESP {
  owner: ID | IUserDoc;
  lastMeasure: ID | IMeasureDoc;
  name: string;
  rxConnection: Date;
  minLevel: number;
  notification: boolean;
}

export interface EspUpdateBody {
  minLevel: number;
  notification: boolean;
  id: ID | string;
  name: string;
}

export interface EspDTO {
  minLevel: number;
  notification: boolean;
  name: string;
}

export type EspUpdateRequest = FastifyRequest<{
  Body: EspUpdateBody;
}>;

export interface IESPDoc extends Document, IESP {}
